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

## Cutting a dev release

So you've made some changes that you're not quite sure work. BOSH allows us to create dev releases, which we can then 
create temporary products out of to test.

### Creating a dev example-release

Make your changes and run the following:

```
$ bosh create release --with-tarball --force
```

This will give you a dev release .tgz.

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
$ bosh create release --final
```

BOSH will create a couple new assets to indicate a new version of the release has been built. You can commit this with
the assurance that all the changes are ok, this is simply because we did not make these changes...BOSH did.

The result of running `bosh create release` will be a new release file (found in `example-release/releases/example-release/`).

### Creating an example-product with the final example-release

To test your changes one more time, you should call `./build-pivotal-file $version $stemcell_version $output_directory`
and again deploy the resulting pivotal file in an Ops Manager.

### Commiting your changes

If you made it this far, you're ready to commit your changes and push.