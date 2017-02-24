# mediathread-firefox

[![Greenkeeper badge](https://badges.greenkeeper.io/ccnmtl/mediathread-firefox.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/ccnmtl/mediathread-firefox.svg?branch=master)](https://travis-ci.org/ccnmtl/mediathread-firefox)

Find assets to analyze in Mediathread.

## Development notes

You will need [jpm](https://www.npmjs.com/package/jpm) and Firefox 38+.

To run from source, `cd` into this directory and run:

    jpm run -b `which firefox`

## Releasing a new version

Mozilla's add-on review process takes time, so we rely on self-distribution
as a backup method. Starting with Firefox 43, all extensions need to be
[signed](https://wiki.mozilla.org/Add-ons/Extension_Signing). This makes
self-distribution a little more complicated than just making an XPI file
and uploading it to github.

* Run `make clean && jpm xpi`, and upload the created xpi to
  https://addons.mozilla.org/en-US/developers/addon/mediathread to put
  it in the review queue.

--

The following steps aren't really necessary anymore, now that Mozilla's
response time for reviewing extensions is a matter of days instead of weeks.

* Change the `name` attribute in `package.json` to
  "mediathread-firefox-prerelease".
* Run the `jpm sign --api-key KEY --api-secret SECRET` command. You can get
  the key and secret strings
  [here](https://addons.mozilla.org/en-US/developers/addon/api/key/).
  This will create a signed xpi and upload it to AMO as an "unlisted"
  extension. Then you'll find a `mediathread-x.x.x-fx.xpi` file in the current
  directory. Upload this file to the release tag in github -- FF 43+
  will allow it to be installed.
