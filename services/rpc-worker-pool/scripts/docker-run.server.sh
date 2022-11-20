#!/usr/bin/bash

echo DESTINATION_PATH="${DESTINATION_PATH:="$(pwd)/docker/downloads"}"
docker run --rm -it \
  --network networkOne \
  -p 5181:8081 -p 5191:9091 \
  --stop-signal 'SIGKILL' \
  --user 1000 --volume "$DESTINATION_PATH":"/downloads" \
  -l 'live:server-pool' \
  --name 'worker-pool-live-server' \
  rpc-worker-pool:latest

# /app/dist/actor.js 172.18.0.2:9091
