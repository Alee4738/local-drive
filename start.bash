#!/bin/bash
set -e

project_root_dir="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

if [ ! -d "$project_root_dir/wwwroot" ]; then
  echo "Website does not exist. Building..."
  pushd "$project_root_dir/frontend" > /dev/null
  ng build
  popd > /dev/null
fi

node "$project_root_dir/index.js"
