# Ops Manager 

# Building the example-product

```
./build-pivotal-file $version $stemcell_version $output_directory
```

For example, `./build-pivotal-file 1.7.42 123.4 /tmp` will create the file `/tmp/example-product-1.7.42.pivotal` 
with product version `1.7.42` and using stemcell `123.4`

# Making changes

It is important to note what part of our example repo you are trying to change. When changing the example release, it 
often leads to bumping example-release. This is because products are explicit around which release version they are consuming.

The classic example is that you've added/removed a property to one of the job specs.

## Templating

Both the metadata and the credhub migration js migration are templates which get populated with the relevant version,
stemcell, and other info when you run the `./build-pivotal-file` script. When making changes, be sure to change
the template, rather than the generated files.

## Cutting a dev release

So you've made some changes that you're not quite sure work. BOSH allows us to create dev releases, which we can then 
create temporary products out of to test.

### Creating a dev example-release

Make your changes and run the following:

```
$ cd example-release
$ git clean -fd dev_releases
$ bosh create release --with-tarball --force
```

This will give you a dev release `.tgz`.

### Updating your metadata

Now you need to update your metadata file to reflect any changes you made to jobs in the bosh release. For example, 
if the `web_server` job has changed what properties are required, then you need to reflect that in the appropriate job manifests.

### Creating an example-product with a dev example-release

After creating the dev release (as described above), simply run

```
$ DEV_RELEASE=true ./build-pivotal-file $version $stemcell_version $output_directory`
```

The `DEV_RELEASE=true` environment variable tells the script to use the development bosh release you just created 
instead of the final release it would normally use.

### Testing your changes

You can now import the pivotal file you just created into an Ops Manager and test deploying it to verify that it works.

## Cutting the final bits

### Updating example-release

After you've tested that your new bosh release works, you need to create the final release with...

```
$ ./example-release/cut-new-release <major and minor version, e.g. 1.10>
```

BOSH will create a couple new assets to indicate a new version of the release has been built. You can commit this with
the assurance that all the changes are ok, this is simply because we did not make these changes...BOSH did.

The result of running `cut-new-release` will be a new release file (found in `example-release/releases/example-release/`).

### Creating an example-product with the final example-release

To test your changes one more time, you should call `./build-pivotal-file $version $stemcell_version $output_directory`
and again deploy the resulting pivotal file in an Ops Manager.

### Committing your changes

If you made it this far, you're ready to commit your changes and push.

# Bumping the minor version

When you are ready to increment the minor version of the example product (e.g. 1.8 => 1.9)...

1. Before bumping the version, create a new branch for the current version number (e.g. releases/1.8) and push it
2. Switch to the master branch
3. Delete everything matching `example-release/releases/example-release/example-release-*.yml`
4. Set the `builds` key in `example-release/releases/example-release/index.yml` to `{}`
5. Run `bosh create release --final --version "${PRODUCT_MAJOR_AND_MINOR_VERSION}.release#{PREVIOUS_BUILD_NUMBER+1}`
  For example, if you were incrementing the version from 1.8 to 1.9 and the newest release in 1.8 was `1.8.release20`,
  then you would use version `1.9.release21`
