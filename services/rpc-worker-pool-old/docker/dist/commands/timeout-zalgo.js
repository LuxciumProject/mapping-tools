"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutZalgo = void 0;
const node_util_1 = require("node:util");
function timeoutZalgo(value, delay) {
    return (0, node_util_1.promisify)(setTimeout)(delay, value);
}
exports.timeoutZalgo = timeoutZalgo;
