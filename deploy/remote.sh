#!/bin/bash

set -e

BRANCH=$1

if [ "x$BRANCH" = "x" ]; then
  echo "Please pass branch to deploy as first argument"
  exit 1
fi

if [ ! -d quick-syscon ]; then
  git clone https://github.com/yunity/quick-syscon.git
fi

(
  cd quick-syscon && \
  git clean -fd && \
  git checkout $BRANCH && \
  git pull && \
  npm install --production && \
  meteor build ~\quick-syscon --architecture os.linux.x86_64
)

touch /tmp/quick-syscon.reload
