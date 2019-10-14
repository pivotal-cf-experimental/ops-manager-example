#!/usr/bin/env bash

set -e

persistent_log_path=$1
telemetry_log_path=$2

echo "PID: $$ --- starting up" >> ${persistent_log_path}

while true
do
  echo "PID: $$ --- `date`" >> ${persistent_log_path}
  echo "{\"telemetry-source\": \"time_logger\", \"telemetry-time\": \"`date --rfc-3339=seconds`\", \"message\": \"some message\"}" >> ${telemetry_log_path}
  sleep 60
done
