#!/usr/bin/env bash
set -eu

gem install bosh_cli

cd $REPO_DIR/example-release

#find the release with the largest number
release_file=$(find releases | grep example-release- | sed -n -e '/s.*([0-9]*).*/n' -e '$p')

echo "creating release ${release_file}"
bosh create release $release_file

echo "moving releases"
mv releases/example-release/*.tgz ../example-product/releases/

echo "creating .pivotal file"
cd ../example-product

zip -r generated-example-product.pivotal metadata releases/
