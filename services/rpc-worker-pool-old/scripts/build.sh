#!/bin/sh

tsc --noEmit false --generateCpuProfile ./docker/out/performance.cpuprofile || exit 1
