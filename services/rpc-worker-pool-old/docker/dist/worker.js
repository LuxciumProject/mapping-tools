'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// #!! Consumed by the RpcWorkerPool class via path to file.
const node_worker_threads_1 = require("node:worker_threads");
const commands_1 = require("./commands");
try {
    if (!node_worker_threads_1.parentPort)
        throw new Error('parentPort is missing or is undefined');
    void node_worker_threads_1.parentPort.on('message', asyncOnMessageWrap(async ({ command_name, params, job_id }) => {
        const messageRPC = {
            jsonrpc: '2.0',
            job_id,
            pid: 'worker: ' + process.pid,
        };
        try {
            const resultRPC = await commands_1.commands[command_name](...params);
            return { ...messageRPC, result: resultRPC };
        }
        catch (error) {
            const errorRPC = {
                code: -32_603,
                message: 'Internal error!!! (Internal JSON-RPC error). ' +
                    (error.message || ''),
                error,
            };
            console.error(String({ ...messageRPC, error: errorRPC }));
            return { ...messageRPC, error: errorRPC };
        }
    }));
}
catch (error) {
    void console.error('Error communicating with parentPort:', error);
}
function asyncOnMessageWrap(fn) {
    return async function (msg) {
        try {
            if (!node_worker_threads_1.parentPort)
                throw new Error('parentPort is undefined');
            void node_worker_threads_1.parentPort.postMessage(await fn(msg));
        }
        catch (error) {
            void console.error('Worker failed to reply (postMessage) to parentPort:', error);
        }
    };
}
