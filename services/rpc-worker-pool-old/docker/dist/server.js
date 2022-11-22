#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const http_1 = require("http");
const net_1 = require("net");
const RpcWorkerPool_1 = require("./RpcWorkerPool");
const VERBOSE1 = true;
// const VERBOSE2 = true;
const [, , web_host, actor_host, threads_, strategy_] = process.argv;
const [web_hostname, web_port] = (web_host || '').split(':');
const [actor_hostname, actor_port] = (actor_host || '').split(':');
const workerScriptFileUri = `${__dirname}/worker.js`;
const threads = Number(threads_ || 0);
const strategy = strategy_ || 'roundrobin';
let message_id = 0;
let actors = new Set(); // collection of actor handlers
let messages = new Map(); // message ID -> HTTP response
// ++ randomActor() --------------------------------------------------
function randomActor() {
    const pool = [...actors];
    return pool[Math.floor(Math.random() * pool.length)];
}
// ++ HTTP_Server ----------------------------------------------------
void (0, http_1.createServer)((req, res) => {
    message_id++;
    if (actors.size === 0)
        return res.end('ERROR: EMPTY ACTOR POOL');
    const actor = randomActor();
    void messages.set(message_id, res);
    const splitedUrl = (req?.url || '').split('/');
    const command_name = splitedUrl.slice(1, 2).pop();
    void actor({
        id: message_id,
        command_name,
        args: [...splitedUrl.slice(2)],
    });
}).listen(Number(web_port), web_hostname, () => {
    console.info('\n\n> ' +
        chalk_1.default.green('web:  ') +
        chalk_1.default.yellow(`http:\/\/${web_hostname}`) +
        ':' +
        chalk_1.default.magenta(`${web_port}`));
});
// ++ TCP_Server -----------------------------------------------------
// export function TCP_Server() {
void (0, net_1.createServer)(tcp_client => {
    const handler = (data) => tcp_client.write(JSON.stringify(data) + '\0\n\0'); // <1>
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
}).listen(Number(actor_port), actor_hostname, () => {
    console.info('> ' +
        chalk_1.default.green('actor: ') +
        chalk_1.default.yellow(`tcp:\/\/${actor_hostname}`) +
        ':' +
        chalk_1.default.magenta(`${actor_port}`) +
        '\n\n\n\n');
});
// ++ new worker from RpcWorkerPool-----------------------------------
const workerPool = new RpcWorkerPool_1.RpcWorkerPool(workerScriptFileUri, threads, strategy, VERBOSE1);
let actor_id = 0;
// ++ actors.add -----------------------------------------------------
void actors.add(async (data) => {
    try {
        // Executor of the worker from pool.
        const timeBefore = performance.now();
        const value = await workerPool.exec(data.command_name, data.id, ...data.args);
        const timeAfter = performance.now();
        const delay = timeAfter - timeBefore;
        const time = Math.round(delay * 100) / 100;
        actor_id++;
        const replyObject = {
            id: data.id,
            pid: `actor(${actor_id}) at process: ${process.pid}`,
        };
        const reply = JSON.stringify({
            jsonrpc: '2.0',
            value,
            ...replyObject,
            performance: delay,
        }) + '\0\n\0';
        console.log('actors.add', {
            jsonrpc: '2.0',
            ...replyObject,
        }, 'performance: ' + chalk_1.default.yellow(time) + ' ms\n');
        void messages.get(data.id).end(reply);
        void messages.delete(data.id);
    }
    catch (error) {
        console.error(error);
    }
});
