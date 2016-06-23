#!/bin/bash

set -e

(
  tar -zxf quick-syscon.tar.gz && \
  cd bundle/programs/server && \
  npm install --production
) && \
(sudo systemctl stop nodejs-quick-syscon || true) && \
(
  cd ~ && \
  (rm -rf bundle_run || true) && \
  mv bundle bundle_run && \
  mv quick-syscon.tar.gz quick-syscon_DEPLOYED.tar.gz
)

sudo systemctl start nodejs-quick-syscon
