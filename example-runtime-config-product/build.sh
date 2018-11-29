#!/bin/bash -exu

readonly PROGDIR="$(cd "$(dirname "${0}")" && pwd)"

function main() {
  local zip_file
  zip_file="/tmp/example-runtime-config-product-2.2.0.pivotal"

  pushd "${PROGDIR}" > /dev/null
    zip -qr "${zip_file}" migrations metadata releases

    echo "BUILT: ${zip_file}"
  popd > /dev/null
}

main "${@:-}"
