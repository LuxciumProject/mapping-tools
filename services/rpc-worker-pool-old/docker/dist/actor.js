#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
// import { Strategies } from './consts';
const RpcWorkerPool_1 = require("./RpcWorkerPool");
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
const upstreamSocket = (0, net_1.connect)(Number(port), hostname, () => {
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
    data_string.slice(0, -1).forEach(async (chunk) => {
        // BUG:~ Must add last non empty chunk first prior to the next chunk
        console.log('chunk:', chunk);
        try {
            const data = JSON.parse(chunk);
            const timeBefore = performance.now();
            const result = await getWorker().exec(data.command_name, `${data.id}`, ...data.args);
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
        }
        catch (err) {
            console.error(err);
        }
    });
});
void upstreamSocket.on('end', () => {
    console.log('  >', 'disconnect from server');
});
function getWorker() {
    return new RpcWorkerPool_1.RpcWorkerPool(workerScriptFileUri, 1, Strategies.random);
}
