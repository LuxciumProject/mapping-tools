#!/bin/sh

tsc --noEmit false --generateCpuProfile ./out/human-size.cpuprofile || exit 1
