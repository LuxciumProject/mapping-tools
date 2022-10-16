#!/bin/sh

tsc --noEmit false --generateCpuProfile ./lib/bigintstring.cpuprofile || exit 1
