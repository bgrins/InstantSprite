---
layout: post
title: Diagonal Sprites
description: Diagonal CSS sprites can be good for top left aligning sprites to long blocks of text that works cross browser with no extra markup. Best to use small icons with low offsets to prevent using too much memory, as the image dimensions are large. 
extradescription: See <a href="http://www.aaronbarker.net/2010/07/diagonal-sprites/">Diagonal Sprites by Aaron Barker</a>.
---

{{ page.title }}
================

<div>

<style type="text/css">
.spritediagonal { position:relative; padding-left:20px; background:url(../../styles/articles/sprite-diagonal.png) transparent no-repeat; }
.spritediagonal.accept { background-position: -182px 0;  }
.spritediagonal.application_cascade { background-position: -156px -26px;  }
.spritediagonal.add { background-position: -130px -52px;  }
.spritediagonal.application_delete { background-position: -104px -78px;  }
.spritediagonal.application_double { background-position: -78px -104px;  }
.spritediagonal.anchor { background-position: -52px -130px;  }
.spritediagonal.application_add { background-position: -26px -156px;  }
.spritediagonal.application_edit { background-position: 0 -182px;  }
</style>

<em>This is an experimental example.  It uses diagonal sprites.  Credit for the idea goes to <a href='http://www.aaronbarker.net/2010/07/diagonal-sprites/'>Aaron Barker</a></em>

<p class="spritediagonal add">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

<p class="spritediagonal accept">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

<p class="spritediagonal anchor">Lorem Ipsum...</p>

</div>