#!/usr/bin/env node
'use strict';
import chalk from 'chalk';
import { createServer as createHTTP_Server } from 'http';
import { createServer as createTCP_Server } from 'net';
import { normalize } from 'node:path';

import { RpcWorkerPool } from './RpcWorkerPool';

const VERBOSE1 = true;
const VERBOSE2 = true;

const [, , web_host, actor_host, threads_, strategy_] = process.argv;
const [web_hostname, web_port] = (web_host || '').split(':');
const [actor_hostname, actor_port] = (actor_host || '').split(':');

const workerScriptFileUri = `${__dirname}/worker.js`;
const threads = Number(threads_ || 0);
const strategy = strategy_ || 'roundrobin';

let message_id = 0;
let actors = new Set(); // collection of actor handlers
let messages = new Map(); // message ID -> HTTP response

// ++ TCP_Server -----------------------------------------------------
export function TCP_Server() {
  return createTCP_Server(tcp_client => {
    const handler = data => tcp_client.write(JSON.stringify(data) + '\0\n\0'); // <1>
    actors.add(handler);
    console.info('actor pool connected', actors.size);

    void tcp_client.on('end', () => {
      actors.delete(handler); // <2>
      console.info('actor pool disconnected', actors.size);
    });

    void tcp_client.on('data', raw_data => {
      void String(raw_data)
        .split('\0\n\0')
        .slice(0, -1) // Remove the last (empty) null, new line, null.
        .forEach(chunk => {
          const data = JSON.parse(chunk);
          const res = messages.get(data.id);

          res.end(JSON.stringify(data) + '\0\n\0');
          messages.delete(data.id);
        });
    });
  });
}

// + tcpServer -------------------------------------------------------
const tcpServer = TCP_Server();
void tcpServer.listen(Number(actor_port), actor_hostname, () => {
  console.info(
    '\n\n> ' +
      chalk.green('actor: ') +
      chalk.yellow(`tcp:\/\/${actor_hostname}`) +
      ':' +
      chalk.magenta(`${actor_port}`)
  );
});

// ++ HTTP_Server ----------------------------------------------------
export function HTTP_Server() {
  return createHTTP_Server(async (req, res) => {
    message_id++;

    if (actors.size === 0) return res.end('ERROR: EMPTY ACTOR POOL');

    const actor = randomActor();

    void messages.set(message_id, res);

    void actor({
      id: message_id,
      method: req.url.split('/').slice(1, 2).pop(),
      args: [normalize(decodeURI(req.url.split('/').slice(2)))],
    });
    chalk.yellow;
  });
}

// + httpServer ------------------------------------------------------
const httpServer = HTTP_Server();
void httpServer.listen(Number(web_port), web_hostname, () => {
  console.info(
    '> ' +
      chalk.green('web:  ') +
      chalk.yellow(`http:\/\/${web_hostname}`) +
      ':' +
      chalk.magenta(`${web_port}`)
  );
});

// ++ randomActor() --------------------------------------------------
function randomActor() {
  const pool = [...actors];
  return pool[Math.floor(Math.random() * pool.length)];
}

// + new worker from RpcWorkerPool------------------------------------
const workerPool = new RpcWorkerPool(
  workerScriptFileUri,
  threads,
  strategy,
  VERBOSE1
);

// + actors.add ------------------------------------------------------
void actors.add(async data => {
  // console.log('actors.add', { data, worker, workers: worker.workers });
  const timeBefore = performance.now();
  const value = await workerPool.exec(data.method, data.id, ...data.args);
  const timeAfter = performance.now();

  console.log('actors.add', {
    id: data.id,
    performance: timeAfter - timeBefore,
    pid: 'actor:' + process.pid,
  });

  const reply =
    JSON.stringify({
      jsonrpc: '2.0',
      id: data.id,
      value,
      pid: 'server:' + process.pid + ' (' + data.id + ')',
    }) + '\0\n\0';

  void messages.get(data.id).end(reply);
  void messages.delete(data.id);
});

/* **************************************************************** */
/*                                                                  */
/*  MIT LICENSE                                                     */
/*                                                                  */
/*  Copyright © 2021-2022 Benjamin Vincent Kasapoglu (Luxcium)      */
/*                                                                  */
/*  NOTICE:                                                         */
/*  O’Reilly Online Learning                                        */
/*                                                                  */
/*  Title: “Multithreaded JavaScript”                               */
/*  Author: “by Thomas Hunter II and Bryan English”                 */
/*  Publisher: “O’Reilly”                                           */
/*  Copyright: “© 2022 Thomas Hunter II and Bryan English”          */
/*  ISBN: “978-1-098-10443-6.”                                      */
/*                                                                  */
/*  Using Code Examples                                             */
/*  Supplemental material (code examples, exercises, etc.)          */
/*  is available for download at                                    */
/*  https://github.com/MultithreadedJSBook/code-samples.            */
/*                                                                  */
/*  In general, if example code is offered with this book, you may  */
/*  use it in your programs and documentation. You do not need to   */
/*  contact us for permission unless you’re reproducing a           */
/*  significant portion of the code. For example, writing a         */
/*  program that uses several chunks of code from this book does    */
/*  not require permission. Selling or distributing examples from   */
/*  O’Reilly books does require permission. Answering a question by */
/*  citing this book and quoting example code does not require      */
/*  permission. Incorporating a significant amount of example code  */
/*  from this book into your product’s documentation does require   */
/*  permission.                                                     */
/*                                                                  */
/*  If you feel your use of code examples falls outside fair use or */
/*  the permission given above, feel free to contact us at          */
/*  permissions@oreilly.com.                                        */
/*                                                                  */
/* **************************************************************** */
