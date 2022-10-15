#!/bin/sh
pwd

rush add \
  -p @rushstack/heft \
  -p @rushstack/heft-jest-plugin \
  -p @types/node@16 \
  -p @typescript-eslint/eslint-plugin@latest \
  -p @typescript-eslint/parser@latest \
  -p eslint-config-prettier@latest \
  -p eslint-import-resolver-typescript@latest \
  -p eslint-plugin-import@latest \
  -p eslint-plugin-jsdoc@latest \
  -p eslint-plugin-jsonc@latest \
  -p eslint-plugin-prettier@latest \
  -p eslint-plugin-react-hooks@latest \
  -p eslint-plugin-react@latest \
  -p eslint-plugin-simple-import-sort@latest \
  -p eslint-plugin-unicorn@latest \
  -p eslint@latest \
  -p jest@latest \
  -p nodemon@latest \
  -p prettier@latest \
  -p ts-node@latest \
  -p typescript@latest \
  --dev --all --make-consistent

rush add \
  -p @types/eslint-config-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/heft-jest \
  -p @types/jest@latest \
  --exact --dev --all --make-consistent

rush add --package tslib@latest --exact --all --make-consistent
