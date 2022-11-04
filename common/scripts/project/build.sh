#!/bin/sh

tsc --noEmit false --generateCpuProfile ./out/performance/compile-task.cpuprofile || exit 1
