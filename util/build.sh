#!/bin/sh

MYDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$MYDIR/..
REQUIREJS=$ROOTDIR/requirejs/build/build.sh

echo "Removing $ROOT/web-build"
rm -r $ROOTDIR/web-build

echo "Starting RequireJS build script $REQUIREJS..."
$REQUIREJS $MYDIR/build.js

echo "Removing original Javascript files..."
shopt -s extglob
rm $ROOTDIR/web-build/scripts/!(require-jquery.js|instantsprite-require.js|site.js)
cp $ROOTDIR/web/.htaccess $ROOTDIR/web-build/

DATE=`date +%s`
perl -pi -e 's/{{VERSION}}/'$DATE'/gi' $ROOTDIR/web-build/index.html $ROOTDIR/web-build/404.html $ROOTDIR/web-build/includes/header.php $ROOTDIR/web-build/includes/footer.php

### Aren't needing this loop anymore, since we have includes with the css/js declared in one place
#for file in `find $MYDIR/web-build -name "*.html" -o -name "*.php"`
#do
#perl -pi -e 's/{{VERSION}}/'$DATE'/gi' $file
#done
