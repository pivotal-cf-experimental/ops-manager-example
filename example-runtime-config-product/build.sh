#!/bin/bash -exu

TMP_DIR="$(mktemp -d)"

readonly PROGDIR="$(cd "$(dirname "${0}")" && pwd)"
readonly EXAMPLEDIR="$(dirname ${PROGDIR})"

function main() {
  local zip_file
  zip_file="/tmp/example-runtime-config-product-1.0.0.pivotal"

  mkdir -p ${TMP_DIR}/metadata
  cp -r ${PROGDIR}/migrations ${TMP_DIR}
  cp -r ${PROGDIR}/releases ${TMP_DIR}

  ${EXAMPLEDIR}/generate-metadata \
    "1.0.0" \
    "170.16" \
    "" \
    "example-runtime-config-product" \
    "" \
    "ubuntu-xenial" \
      > "${TMP_DIR}/metadata/example-runtime-config-product.yml"

  pushd "${TMP_DIR}" > /dev/null
    zip -qr "${zip_file}" migrations metadata releases

    echo "BUILT: ${zip_file}"
  popd > /dev/null
}

trap "rm -rf ${TMP_DIR}" EXIT

main "${@:-}"

