# Building the example-product

## Creating the example-release .tgz

Navigate to the `/example-release` directory and run the following:

```
$ bosh create release releases/example-release/example-release-12.yml
```

Here, we are creating example-release v12. You should use the most recent version.
Running this command will output the location of a release .tgz. Copy this tarball
into your `/example-product/releases` directory.

## Creating the example-product .pivotal

Use the `./create.rb` script found in the `/example-product` directory. This will
produce a .pivotal file such as `example-product_1.7.0.0-alpha_03-17-16.pivotal`.

# Making changes

It is important to note what part of our example repo you are trying to change. When changing the example release, it often leads to bumping example-release. This is because products are explicit around which release version they are consuming.

## Updating example-release

The classic example is that you've added/removed a property to one of the job specs. After you've commited that, we need to run a couple BOSH commands to create the final bits.

```
$ bosh create release --final
```

BOSH will create a couple new assets to indicate a new version of the release has been built. You can commit this with the assurance that all the changes are ok, this is simply because we did not make these changes...BOSH did.

The result of running `bosh create release` will be a new release file (found in `example-release/releases/example-release/`).

## Updating the example-product

### Bumping the release version

So there's a new version of the example-release that our example-product now must begin consuming. Ensure that a release file exists for the version you are bumping to (found in `example-release/releases/example-release/`).

Navigate into `metadata/example-product.yml` and look for the `releases` section. See: https://github.com/pivotal-cf-experimental/ops-manager-example/blob/aa119b4afd15ee12680cdcbdbf4a5fafa0e6a99c/example-product/metadata/example-product.yml#L19-L22

This example currently has example-release v13. Just alter the number 13 to whatever release you are bumping to.

The next step when changing the release, is to account for any changes to any of the jobs. For example, if the `web_server` job has changed what properties are required, then we need to reflect that in the appropriate job manifests.

After changing the `releases` and `manifest` sections, you can commit and push.
