#!/bin/sh

# This script is used to build the project.
pwd
(
  # cd destinationPATH="$(dirname -- "$0")" || exit 1
  pwd
  ls
  tsc -b configs/tsconfig.build.json --verbose
)
