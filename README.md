# Instant Sprite
A fast browser-based CSS Sprite Generator.
Uses HTML Canvas and JavaScript FileReader to help you generate CSS Sprites as quickly as possible.
http://instantsprite.com

## Contributing
You should be able to develop locally without any build tools.  Just navigate to the site directory in a browser to test.  
NOTE: some browsers do not deal well with reading files from a file:// domain (if you just opened it directly from the filesystem).  It is best to develop through a web server to avoid this problem.

If you would like to create a build package, you will need rake and jekyll installed on your system.
Then you can run `rake build` from the root directory, and it will create an output directory called site-build with the minified script references, etc.

## License
Instant Sprite is open source under MIT License.  See LICENSE.

## Open Source projects used
* jQuery - http://jquery.com/
* jQuery UI/Sortable - http://jqueryui.com/
* filereader.js - http://github.com/bgrins/filereader.js
* jquery-tmpl - http://github.com/jquery/jquery-tmpl
* famfamfam silk icons - http://code.google.com/p/famfamfam/wiki/silk_icons_gif
