#!/usr/bin/bash

echo DESTINATION_PATH="${DESTINATION_PATH:="$(pwd)/docker/downloads"}"
docker run --rm -it \
  --network networkOne \
  --stop-signal 'SIGKILL' \
  --user 1000 --volume "$DESTINATION_PATH":"/downloads" \
  -l 'live:actor-pool' \
  --name 'actor-pool-live' \
  rpc-worker-pool:latest /app/dist/actor.js worker-pool-live-server:9091

# -p 5081:8081 -p 5091:9091 \
