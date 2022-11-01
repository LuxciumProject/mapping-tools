#!/bin/sh

tsc --noEmit false --generateCpuProfile ./lib/colors-tools.cpuprofile || exit 1
