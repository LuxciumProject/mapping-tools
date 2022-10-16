#!/bin/sh

tsc --noEmit false --generateCpuProfile ./lib/boxed-list.cpuprofile || exit 1
