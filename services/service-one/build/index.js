"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisClient = void 0;
exports.default = () => console.log('Hello from service one');
var redis_services_1 = require("@luxcium/redis-services");
Object.defineProperty(exports, "createRedisClient", { enumerable: true, get: function () { return redis_services_1.createRedisClient; } });
