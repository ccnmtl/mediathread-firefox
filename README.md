# mediathread-firefox

[![Build Status](https://travis-ci.org/ccnmtl/mediathread-firefox.svg?branch=master)](https://travis-ci.org/ccnmtl/mediathread-firefox)

Find assets to analyze in Mediathread.

## Development notes

You can use the [web-ext](https://www.npmjs.com/package/web-ext) tool for development.

To run from source, `cd` into this directory and run:

    web-ext run --verbose

## Releasing a new version

Mozilla's add-on review process takes time, so we rely on self-distribution
as a backup method. Starting with Firefox 43, all extensions need to be
[signed](https://wiki.mozilla.org/Add-ons/Extension_Signing). This makes
self-distribution a little more complicated than just making an XPI file
and uploading it to github.

* Run `make clean && jpm xpi`, and upload the created xpi to
  https://addons.mozilla.org/en-US/developers/addon/mediathread to put
  it in the review queue.
