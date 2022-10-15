#!/bin/sh
pwd
rush add \
  -p @types/eslint-config-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/jest@latest \
  -p @types/node \
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
  -p ts-jest@latest \
  -p ts-node@latest \
  -p typescript@latest \
  --dev --all --make-consistent
rush purge
rush update
rush rebuild
