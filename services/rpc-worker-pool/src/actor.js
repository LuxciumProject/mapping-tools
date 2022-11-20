#!/usr/bin/env node
'use strict';
import { connect } from 'net';

// import { Strategies } from './consts';
import { RpcWorkerPool } from './RpcWorkerPool';

const workerScriptFileUri = `${__dirname}/worker.js`;

const [, , host] = process.argv;
const [hostname, port] = host.split(':');

const Strategies = {
  roundrobin: 'roundrobin',
  random: 'random',
  leastbusy: 'leastbusy',
};
// ++ ----------------------------------------------------------------
console.log('Will try to connect', host);
const upstreamSocket = connect(Number(port), hostname, () => {
  console.log('  > Actor pool connected to server!');
});

void upstreamSocket.on('error', error => {
  console.error(error);
});

void upstreamSocket.on('data', raw_data => {
  console.log('raw_data:', String(raw_data));

  const data_string = String(raw_data).split('\0\n\0');
  const last_data_string = data_string.slice(-1)[0];
  if (last_data_string.length > 0) {
    console.log('last_data_string.length > 0', last_data_string);
  }
  data_string.slice(0, -1).forEach(async chunk => {
    // BUG:~ Must add last non empty chunk first prior to the next chunk
    console.log('chunk:', chunk);
    try {
      const data = JSON.parse(chunk);
      const timeBefore = performance.now();
      const result = await getWorker().exec(
        data.method,
        `${data.id}`,
        ...data.args
      );
      const timeAfter = performance.now();

      console.log('remote.actors.add', {
        id: data.id,
        performance: timeAfter - timeBefore,
        pid: 'actor:' + process.pid,
      });

      const jsonRpcMessage = {
        jsonrpc: '2.0',
        id: data.id,
        result,
        pid: 'actor:' + process.pid,
      };

      void upstreamSocket.write(JSON.stringify(jsonRpcMessage) + '\0\n\0');
    } catch (err) {
      console.error(err);
    }
  });
});

void upstreamSocket.on('end', () => {
  console.log('  >', 'disconnect from server');
});

function getWorker() {
  return new RpcWorkerPool(workerScriptFileUri, 1, Strategies.random);
}

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
