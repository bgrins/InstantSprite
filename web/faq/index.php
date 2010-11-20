<?
$title = 'FAQ';
$description = 'Why Instant Sprite, the CSS Sprite Generator, was created, what open source software is used, what browsers are supported by Instant Sprite, and other questions.';
include('../includes/header.php');
?>

<ul>
<li><a href='#why'>Why did you make Instant Sprite?</a></li>
<li><a href='#how'>How do I use CSS Sprites?</a></li>
<li><a href='#upload'>Do my files get uploaded to your server?</a></li>
<li><a href='#support'>What browsers are supported?</a></li>
<li><a href='#oss'>Is Instant Sprite open source?</a></li>
<li><a href='#who'>Who is working on Instant Sprite?</a></li>
</ul>

<h3><a name="why">Why did you make Instant Sprite?</a></h3>

<p>
Instant Sprite was created to deal with some issues I had when generating CSS Sprites.  There are some tools online which work great, but require extra steps before generating the sprite (such as zipping up all the images).  Instant Sprite allows you to make tweaks to the settings and instantly see the results.
</p>
<p>
Hopefully you find it useful too - it is a work in progress, so <a href='../feedback'>leave me some feedback</a> if you find any bugs, typos, or just want to leave a comment.  
</p>

<h3><a name="how">How do I use CSS Sprites?</a></h3>

<p>
I have <a href='../articles/'>written a number of articles</a> to hopefully help you hit the ground running with CSS sprites.
</p>
<p>
If you are just starting out, I would recommend <a href='../articles/what-are-css-sprites'>What Are CSS Sprites</a><!-- and <a href='../articles/how-to-use-css-sprites'>How To Use CSS Sprites</a>--> to get a grip on the basics of sprites.
</p>

<h3><a name="upload">Do my files get uploaded to your server?</a></h3>

<p>
<strong>No.</strong>  Instant Sprite does not upload anything to a server, everything is kept on your computer.  It does this by using the Canvas and File API provided in upcoming versions of HTML and JavaScript to run only inside your browser.
</p>

<h3><a name="support">What browsers are supported?</a></h3>

<p>Instant Sprite uses some features that are not fully supported by all browsers, most notably the <a href='http://www.w3.org/TR/FileAPI/'>File API</a>.</p>

<p>At the time of writing, the browsers that support this are:</p>
<ul>
<li>Firefox 3.5+</li>
<li>Chrome 6.0+</li>
</ul>

Safari has support planned for a future release.  An updated list can be found on the "<a href='http://caniuse.com/#feat=fileapi'>When can I use</a>" site.

<h3><a name="oss">Is Instant Sprite open source?</a></h3>

<p><strong>Yes.</strong>  See the code at <a href='http://github.com/bgrins/InstantSprite'>http://github.com/bgrins/InstantSprite</a>.  Additionally, Instant Sprite makes use of some excellent open source software.  Here is a listing:</p>

<ul>
<li><a href='http://jquery.com/'>jQuery</a></li>
<li><a href='http://jqueryui.com/'>jQuery UI (Sortable)</a></li>
<li><a href='http://requirejs.org/'>RequireJS</a></li>
<li><a href='http://github.com/bgrins/filereader.js'>filereader.js</a></li>
<li><a href='http://github.com/jquery/jquery-tmpl'>jquery-tmpl</a></li>
<li><a href='http://code.google.com/p/famfamfam/wiki/silk_icons_gif'>famfamfam silk icons</a></li>
</ul>

<h3><a name="who">Who is working on Instant Sprite?</a></h3>

<p>The original work was done by <a href='http://briangrinstead.com'>Brian Grinstead</a>.  Any other contributors will be listed on the <a href='http://github.com/bgrins/InstantSprite/contributors'>contributors page</a> for the project.</p>

<?
include('../includes/footer.php');
?>