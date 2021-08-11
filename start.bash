#!/bin/bash
set -e

if [ ! -d "wwwroot" ]; then
  echo "Website does not exist. Building..."
  pushd frontend > /dev/null
  ng build
  popd > /dev/null
fi

node index.js
