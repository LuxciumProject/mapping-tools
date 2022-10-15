#!/bin/sh

tsc --noEmit false --generateCpuProfile ./out/phash-convertor.cpuprofile || exit 1
