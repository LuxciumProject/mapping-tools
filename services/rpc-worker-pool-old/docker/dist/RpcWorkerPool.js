'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcWorkerPool = void 0;
const os_1 = require("os");
const worker_threads_1 = require("worker_threads");
const VERBOSE = false;
const CORES = (0, os_1.cpus)().length;
// type Strategies = 'roundrobin' | 'random' | 'leastbusy';
const STRATEGIES = new Set(['roundrobin', 'random', 'leastbusy']);
class RpcWorkerPool {
    size;
    strategy;
    versosity;
    rr_index;
    next_job_id;
    workers;
    constructor(path, size = 0, strategy = 'leastbusy', versosity = VERBOSE) {
        this.size = size < 0 ? Math.max(CORES + size, 1) : size || CORES;
        this.strategy = STRATEGIES.has(strategy) ? strategy : 'leastbusy';
        this.versosity = versosity;
        this.rr_index = -1;
        this.next_job_id = 0;
        this.workers = [];
        for (let worker_id = 0; worker_id < this.size; worker_id++) {
            const worker = new worker_threads_1.Worker(path);
            this.workers.push({ worker, in_flight_commands: new Map() });
            worker.on('message', msg => {
                this.onMessageHandler(msg, worker_id);
            });
        }
    }
    // ++ --------------------------------------------------------------
    onMessageHandler(msg, worker_id) {
        const worker = this.workers[worker_id];
        const { result, error, job_id } = msg;
        // resolve: (value: any) => void, reject: (reason?: any) =>
        const { resolve, reject } = worker.in_flight_commands.get(job_id);
        worker.in_flight_commands.delete(job_id);
        if (error)
            reject(error);
        else
            resolve(result);
    }
    // ++ --------------------------------------------------------------
    async exec(command_name, message_id, ...args) {
        const job_id = this.next_job_id++;
        // The message_id is provided for feedback purpose only.
        const worker = this.getWorker(message_id);
        const promise = new Promise((resolve, reject) => {
            worker.in_flight_commands.set(job_id, { resolve, reject });
        });
        worker.worker.postMessage({ command_name, params: args, job_id });
        return promise;
    }
    // ++ --------------------------------------------------------------
    getWorker(message_id = -1) {
        let worker_id = 0;
        switch (this.strategy) {
            case 'random':
                worker_id = Math.floor(Math.random() * this.size);
                break;
            case 'roundrobin':
                this.rr_index++;
                if (this.rr_index >= this.size)
                    this.rr_index = 0;
                worker_id = this.rr_index;
                break;
            case 'leastbusy':
            default:
                let min = Infinity;
                for (let i = 0; i < this.size; i++) {
                    let worker = this.workers[i];
                    if (worker.in_flight_commands.size < min) {
                        min = worker.in_flight_commands.size;
                        worker_id = 0;
                    }
                }
        }
        this.versosity &&
            console.log(`\n\nWorker: ${worker_id + 1} Message id: ${message_id || 0}\n`);
        return this.workers[worker_id];
    }
}
exports.RpcWorkerPool = RpcWorkerPool;
exports.default = RpcWorkerPool;
