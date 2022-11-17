'use strict';
// #!! Consumed by the RpcWorkerPool class via path to file.

import { parentPort } from 'node:worker_threads';
import { wget } from './commands/wget';
const commands: { [k: string]: any } = {
  async method001(...args: any[]) {
    const arg0 = (args[0] as string).split(',');
    const source = decodeURIComponent(arg0[0]);
    const localDestination = decodeURIComponent(arg0[1]);
    return wget(source, localDestination, '/bin/bash');
  },
};

try {
  if (!parentPort) throw new Error('parentPort is missing or is undefined');
  void parentPort.on(
    'message',
    asyncOnMessageWrap(async ({ method, params, id }: MsgObjectToWrap) => {
      const messageRPC = {
        jsonrpc: '2.0',
        id,
        pid: 'worker:' + process.pid,
      };
      try {
        const resultRPC = await commands[method](...params);
        return { ...messageRPC, result: resultRPC };
      } catch (error: any) {
        const errorRPC = {
          code: -32_603,
          message:
            'Internal error!!! (Internal JSON-RPC error). ' +
            (error.message || ''),
          data: error,
        };
        console.error(String({ ...messageRPC, error: errorRPC }));
        return { ...messageRPC, error: errorRPC };
      }
    })
  );
} catch (error) {
  void console.error('Error communicating with parentPort:', error);
}

function asyncOnMessageWrap(fn: WraperFunction) {
  return async function (msg: MsgObjectToWrap) {
    try {
      if (!parentPort) throw new Error('parentPort is undefined');
      void parentPort.postMessage(await fn(msg));
    } catch (error) {
      void console.error(
        'Worker failed to reply (postMessage) to parentPort:',
        error
      );
    }
  };
}
type MsgObjectToWrap = { method: string; params: string; id: string };
type WraperFunction = (msgObject: MsgObjectToWrap) => Promise<any>;
/*
// import { commands } from './commands';
  method002() {
    return 'unimplemented';
  },
  wget,
      console.log({ method, params, id }, __filename);

console.log(
      '\n\nXXXXXXXXXXXXXXXXXXXXXXXXXX\n',
      { source, localDestination },
      '\nXXXXXXXXXXXXXXXXXXXXXXXXXX source\n',
      source,
      '\nXXXXXXXXXXXXXXXXXXXXXXXXXX localDestination\n',
      localDestination,
      '\nXXXXXXXXXXXXXXXXXXXXXXXXXX\n\n'
    );
 // return [
    //   'at method001 calling wget',
    //   '\nin FILEMNAME:',
    //   __filename,
    //   '\n\n\n',
    // ];

 */
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
