#!/bin/sh

# This script is used to build the project.
pwd
(
  cd ./services/service-one/ || exit 1
  pwd
  ls
  sh ./scripts/build.sh
)
