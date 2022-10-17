#!/bin/sh

npm install --global --force \
  @microsoft/rush \
  @rushstack/heft@latest \
  eslint@latest \
  jest@latest \
  nodemon@latest \
  npm@latest \
  pnpm@latest \
  prettier@latest \
  ts-node@latest \
  typescript@latest \
  vsce@latest \
  yarn@latest

pnpm add --global \
  @microsoft/rush \
  @rushstack/heft@latest \
  corepack@latest \
  eslint@latest \
  jest@latest \
  nodemon@latest \
  npm@latest \
  pnpm@latest \
  prettier@latest \
  ts-node@latest \
  typescript@latest \
  vsce@latest \
  yarn@latest

yarn global add \
  @microsoft/rush \
  @rushstack/heft@latest \
  corepack@latest \
  eslint@latest \
  jest@latest \
  nodemon@latest \
  npm@latest \
  pnpm@latest \
  prettier@latest \
  ts-node@latest \
  typescript@latest \
  vsce@latest \
  yarn@latest

echo "$PATH"
