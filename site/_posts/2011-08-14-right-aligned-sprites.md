---
layout: post
title: Right Aligned Sprites
description: Right aligned css sprites are used when you want an icon right aligned next to long blocks of text. 
example: true
---

{{ page.title }}
================

<div>
<p>There are a few ways to accomplish right aligned sprites next to paragraph text.  Note that these do not require that you use a &lt;p&gt; tag - they are techniques for dealing with arbitrarily long text.</p>

<h3>Use an extra element</h3>

<em>This uses an absolutely positioned element within a relative parent to align sprites right.</em>

<p>This method requires adding an additional element inside of the text container.  By setting the container to <code>position:relative;</code> and the additional element to <code>position:absolute;</code>, we have a lot of flexibility with where we place the sprite, and don't have to worry about overflows or offsets, since we can set the width and height directly on the sprite.</p>

<div>
<style type='text/css' data-linked='extra-element-demo'>
p.right-container { padding-right:20px; position:relative; }

.right { position:absolute; top:0; right:0; display:block; width:16px; height:16px; background:url(../../styles/articles/sprite-vertical.png) transparent no-repeat; }
.right.accept { background-position: 0 0; }
.right.add { background-position: 0 -21px; }
.right.application_cascade { background-position: 0 -42px; }
.right.application_delete { background-position: 0 -63px; }
.right.application_double { background-position: 0 -84px; }
.right.anchor { background-position: 0 -105px; }
.right.application_add { background-position: 0 -126px; }
.right.application_edit { background-position: 0 -147px; }
</style>
</div>

<section id='extra-element-demo' class='demo viewsource'>
<p class='right-container'><span class='right add'></span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

<p class='right-container'><span class='right accept'></span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

<p class='right-container'><span class='right anchor'></span>Lorem Ipsum...</p>
</section>

<h3>Use the :after pseudoclass (experimental)</h3>

<em>This is an experimental example.  It uses the :after pseudo class, and will not work in IE &lt;= 7.</em>

<p>This allows you to use a right aligned sprite, without having to add extra elements to your HTML.  Unfortunately, due to browser compatibility, I do not recommend using it (unless if you can ignore IE &lt;= 7.</p>

<div>
<style type='text/css' data-linked="after-demo">
.right-using-after { position:relative; padding-right:20px;}
.right-using-after:after { 
	background:url(sprite-vertical.png) transparent no-repeat;
	height: 16px; 
	width:16px; 
	position:absolute; 
	top:0; 
	right:0; 
	display:block; 
	content: '';
}

.right-using-after.accept:after { background-position: 0 0; }
.right-using-after.add:after { background-position: 0 -21px; }
.right-using-after.application_cascade:after { background-position: 0 -42px; }
.right-using-after.application_delete:after { background-position: 0 -63px; }
.right-using-after.application_double:after { background-position: 0 -84px; }
.right-using-after.anchor:after { background-position: 0 -105px; }
.right-using-after.application_add:after { background-position: 0 -126px; }
.right-using-after.application_edit:after { background-position: 0 -147px; }    
</style>
</div>

<section id='after-demo' class='demo viewsource'>
<p class="right-using-after add">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

<p class="right-using-after accept">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

<p class="right-using-after anchor">Lorem Ipsum...</p>
</section>
</div>