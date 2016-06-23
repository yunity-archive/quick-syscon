#!/bin/bash

set -e

HOST=yuca.yunity.org
USERNAME=deploy_syscon

BRANCH=$CIRCLE_BRANCH

if [ "x$BRANCH" = "x" ]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

echo "deploying branch [$BRANCH] to [$HOST]"

scp deploy/remote.sh $USERNAME@$HOST:deploy.sh
scp deploy/quick-syscon.tar.gz $USERNAME@$HOST:quick-syscon.tar.gz
ssh $USERNAME@$HOST /bin/sh deploy.sh
