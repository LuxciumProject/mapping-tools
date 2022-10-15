#!/bin/sh

tsc --noEmit false --generateCpuProfile ./out/boxed-list.cpuprofile || exit 1
