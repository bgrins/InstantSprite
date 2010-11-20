<?
$title = 'Articles';
$description = 'Articles and examples about CSS Sprite generation, CSS Sprite techniques, What Are CSS Sprites, etc.';
include('../includes/header.php');
?>

<div class='info'>These articles and examples are a work in progress.  Look for new and updated articles soon.</div>

<ul>
<li>
<a href='what-are-css-sprites/'>What are CSS sprites and when would I use them?</a>  CSS sprites are a method for minimizing image requests for a web page.  This article gives a brief overview of CSS sprites.
</li>
<!--<li>
<a href='how-to-use-css-sprites/'>How do I use CSS sprites?</a>  There are many ways to use sprites, and it is important to find ones that fits into your workflow.  When it is inconvenient, I find excuses not to do it and don't get all the benefits that spriting provides.
</li>-->
</ul>

<h2>Examples</h2>
<ul>
<li>
<a href='diagonal-sprites/'>Diagonal Sprites</a>: great for top left aligning sprites to long blocks of text that works cross browser with no extra markup.  Best to use small icons with low offsets to prevent using too much memory, as the image dimensions are large.  See <a href='http://www.aaronbarker.net/2010/07/diagonal-sprites/'>Diagonal Sprites by Aaron Barker</a>.
</li>
<li>
<a href='right-aligned-sprites/'>Right aligned sprites</a>: Used for an icon next to long blocks of text.  Uses extra markup, but is cross browser.
</li>
<li>
<a href='right-aligned-sprites-after-pseudoclass/' class='experimental'>Right aligned sprites using :after pseudoclass</a>: A technique I came up with that can give you right aligned sprites with no extra markup, but relies on the :after CSS pseudoclass, which is not supported in IE<=7.
</li>
</ul>

<h2>Links</h2>
<p>There have been many other articles written about CSS sprites.  Here are some external sites that may help to get started, or provide more information.</p>
<ul>
<li><a href='http://www.alistapart.com/articles/sprites'>A List Apart</a></li>
<li><a href='http://www.smashingmagazine.com/2009/04/27/the-mystery-of-css-sprites-techniques-tools-and-tutorials/'>Smashing Magazine</a></li>
<li><a href='http://developer.yahoo.com/performance/rules.html'>Yahoo Developer Network</a></li>
<li><a href='http://code.google.com/speed/page-speed/docs/rtt.html#SpriteImages'>Google Page Speed</a></li>
</ul>

<?
include('../includes/footer.php');
?>