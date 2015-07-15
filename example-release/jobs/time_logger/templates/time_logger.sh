#!/usr/bin/env bash

set -e

log_path=$1

echo "PID: $$ --- starting up" >> ${log_path}

while true
do
  echo "PID: $$ --- `date`" >> ${log_path}
  sleep 60
done
