#!/bin/sh

tsc --noEmit false --generateCpuProfile ./lib/human-size.cpuprofile || exit 1
