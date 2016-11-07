# Ops Manager


# Building the example-product

## Locally build the example-release .tgz

Navigate to the `/example-release` directory and run the following:

```
$ bosh create release releases/example-release/example-release-$(NEWEST_VERSION).yml
```

Here, we are locally rebuilding the example-release v20 tarball. You should use the most recent version.
Running this command will output the location of a release .tgz. Copy this tarball
into your `/example-product/releases` directory.

## Creating the example-product .pivotal

Use the `./create.rb` script found in the `/example-product` directory. This will
produce a .pivotal file such as `example-product_1.7.0.0-alpha_03-17-16.pivotal`.

# Making changes

It is important to note what part of our example repo you are trying to change. When changing the example release,
you will also need to change the example product metadata. This is because products explicitly reference the version
of the release tarball.

## Cutting a dev release

So you've made some changes that you're not quite sure work. BOSH allows us to create dev releases, which we can
then create temporary products out of to test.

### Creating a dev example-release

Commit your changes and run the following:

```
$ bosh create release --with-tarball
```

*You can allow BOSH to accept a dirty git state with the `--force` flag*

This will give you a dev release .tgz.

### Creating an example-product with a dev example-release

Copy over the dev-release .tgz from above into example-product/releases.

After this, we'll need to update the product template to use this release. For example, to configure the product to
use dev release `example-release-14+dev.1.tgz`, we'd update the `releases` section to look like:

```yaml
releases:
  - name: example-release
    file: example-release-14+dev.1.tgz
    version: "14+dev.1"
```

With this configured, we can run our `create.rb` script to create our .pivotal file. From here, run through an actual
deploy and observe whatever changes you expect to see.

## Cutting the final bits

### Updating example-release

The classic example is that you've added/removed a property to one of the job specs. After you've committed that, we
need to run the `cut-new-release` script in the `example-release` directory.

```
$ example-release/cut-new-release
```

This script will create a new release file `example-release/releases/example-release/`. Be sure to commit this.

### Updating the example-product

#### Bumping the release version

Navigate into `metadata/example-product.yml` and look for the `releases` section. To bump only the release version
from 20 to 21, we might expect to see the following changes:

from:

```yaml
releases:
  - name: example-release
    file: example-release-1.6.release20.tgz
    version: "1.6.release20"
```

to:

```yaml
  - name: example-release
    file: example-release-1.6.release21.tgz
    version: "1.6.release21"
```

The next step when changing the release, is to account for any changes to any of the jobs. For example, if the
`web_server` job has changed what properties are required, then we need to reflect that in the appropriate job
manifests.

After changing the `releases` and `manifest` sections, you can commit and push.

# Bumping the minor version

When you are ready to increment the minor version of the example product (e.g. 1.8 => 1.9)...

1. Before bumping the version, create a new branch for the current version number (e.g. releases/1.8) and push it
2. Switch to the master branch
3. Update the product version in `example-product/metadata/example-product.yml`
4. Delete everything matching `example-release/releases/example-release/example-release-*.yml`
5. Set the `builds` key in `example-release/releases/example-release/index.yml` to `{}`
6. Run `bosh create release --final --version "${PRODUCT_MAJOR_AND_MINOR_VERSION}.release#{PREVIOUS_BUILD_NUMBER+1}`
  For example, if you were incrementing the version from 1.8 to 1.9 and the newest release in 1.8 was `1.8.release20`,
  then you would use version `1.9.release21`
7. Update the `releases` key in `example-product/metadata/example-product.yml` to point to the new version
