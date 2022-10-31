#!/bin/sh

tsc --noEmit false --generateCpuProfile ./out/bigintstring.cpuprofile || exit 1
