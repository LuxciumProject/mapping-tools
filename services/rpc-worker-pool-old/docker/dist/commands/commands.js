"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const tslib_1 = require("tslib");
const wget_1 = require("./wget");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const codecs_1 = require("./codecs");
const timeout_zalgo_1 = require("./timeout-zalgo");
exports.commands = {
    ['hello-world'](...args) {
        console.log(chalk_1.default.ansi256(209)('Hello wold will echo back:'), chalk_1.default.ansi256(92)((0, codecs_1.deserializeURI)(...args)) + '\n\n');
        return {
            ['hello-world']: chalk_1.default.yellow('Hello wold just echo back!'),
            args: (0, codecs_1.deserializeURI)(...args),
        };
    },
    async delay(...args) {
        const result = (0, timeout_zalgo_1.timeoutZalgo)(args, Number(args[0]) || 2000);
        console.log('\ncomputing:', { result });
        await result;
        console.log('done:', { result }, '\n');
        return result;
    },
    async wget(...args) {
        const arg0 = args[0].split(',');
        const source = (0, codecs_1.deserializeURI)(arg0[0]);
        const localDestination = (0, codecs_1.deserializeURI)(arg0[1]);
        return (0, wget_1.wget)(source, localDestination);
    },
};
