#!/bin/sh
rm -fr ../out
tsc --noEmit false --generateCpuProfile \"./out/redis-services.cpuprofile\" || exit 1
