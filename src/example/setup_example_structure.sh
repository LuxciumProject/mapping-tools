#!/bin/bash

# Navigate to the example directory
cd /projects/monorepo-one/library/mapping-tools/src/example || exit

# Create the main directory
mkdir -p example-directory

# Create 10 folders inside example-directory
for i in $(seq 1 10); do
  mkdir -p "example-directory/folder-$i"

  # Create 10 empty files in each folder
  for j in $(seq 1 10); do
    touch "example-directory/folder-$i/file-$j.txt"
  done
done

echo "Example directory structure created successfully."
