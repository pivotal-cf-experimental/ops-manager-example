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
