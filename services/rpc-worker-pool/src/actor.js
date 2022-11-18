#!/usr/bin/env node
'use strict';
import { connect } from 'net';

import { Strategies } from './consts';
import { RpcWorkerPool } from './RpcWorkerPool';

// HACK:------ Hard coded path will cause problems MUST FIX ----------
const workerScriptFileUri = `${__dirname}/worker.js`;

const [, , host] = process.argv;
const [hostname, port] = host.split(':');

// ++ ----------------------------------------------------------------

const upstream = connect(Number(port), hostname, e => {
  console.log('  >', e, '  > connected to server!');
});

void upstream.on('data', raw_data => {
  void String(raw_data)
    .split('\0\n\0')
    .slice(0, -1)
    .forEach(async chunk => {
      const data = JSON.parse(chunk);
      const result = await getWorker().exec(
        data.method,
        `${data.id}`,
        ...data.args
      );

      void upstream.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: data.id,
          result,
          pid: 'actor:' + process.pid,
        }) + '\0\n\0'
      );
    });
});

void upstream.on('end', () => {
  console.log('  >', 'disconnect from server');
});

function getWorker() {
  return new RpcWorkerPool(workerScriptFileUri, 1, Strategies.leastbusy);
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
