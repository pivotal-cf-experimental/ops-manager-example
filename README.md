# Ops Manager 


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

Typically product authors are not responsible for maintaining the bosh releases their product is composed of. More often than not, they are simply consumers. We should treat this repo the same, and make our commits to example-release independent to example-product.


## Cutting a dev release

So you've made some changes that you're not quite sure work. BOSH allows us to create dev releases, which we can then create temporary products out of to test.

### Creating a dev example-release

Commit your changes and run the following:

```
$ bosh create release --with-tarball
```

*You can allow BOSH to accept a dirty git state with the `--force` flag*

This will give you a dev release .tgz.

### Creating an example-product with a dev example-release

Copy over the dev-release .tgz from above into example-product/releases.

After this, we'll need to update the product template to use this release. For example, to configure the product to use dev release `example-release-14+dev.1.tgz`, we'd update the `releases` section to look like:

```yaml
releases:
  - name: example-release
    file: example-release-14+dev.1.tgz
    version: "14+dev.1"
```

With this configured, we can run our `create.rb` script to create our .pivotal file. From here, run through an actual deploy and observe whatever changes you expect to see.

## Cutting the final bits

### Updating example-release

The classic example is that you've added/removed a property to one of the job specs. After you've commited that, we need to run a couple BOSH commands to create the final bits.

```
$ bosh create release --final
```

BOSH will create a couple new assets to indicate a new version of the release has been built. You can commit this with the assurance that all the changes are ok, this is simply because we did not make these changes...BOSH did.

The result of running `bosh create release` will be a new release file (found in `example-release/releases/example-release/`).

### Updating the example-product

#### Bumping the release version

So there's a new version of the example-release that our example-product now must begin consuming. Ensure that a release file exists for the version you are bumping to (found in `example-release/releases/example-release/`).

Navigate into `metadata/example-product.yml` and look for the `releases` section. To bump only the release version from 13 to 14, we might expect to see the following changes:

from:

```yaml
releases:
  - name: example-release
    file: example-release-13.tgz
    version: "13"
```

to:

```yaml
  - name: example-release
    file: example-release-14.tgz
    version: "14"
```

The next step when changing the release, is to account for any changes to any of the jobs. For example, if the `web_server` job has changed what properties are required, then we need to reflect that in the appropriate job manifests.

After changing the `releases` and `manifest` sections, you can commit and push.
