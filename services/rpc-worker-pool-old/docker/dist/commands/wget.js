"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wget = void 0;
const child_process_1 = require("child_process");
const node_util_1 = require("node:util");
const codecs_1 = require("./codecs");
async function wget(imageSource, destination, shell = '/bin/bash') {
    const sourceUrl = (0, codecs_1.sanitizeURI)(imageSource);
    const destinationPath = `/downloads/${decodeURIComponent(destination)}`;
    const execCommand = `/usr/bin/wget --debug -nc "${sourceUrl}" -P "${destinationPath}"`;
    return (0, node_util_1.promisify)(child_process_1.exec)(execCommand, { shell });
}
exports.wget = wget;
