<?
$title = 'Right Aligned Sprites';
$description = 'Right aligning css sprites.';
$example = true;
include('../../includes/header.php');
?>

<style type='text/css'>
p { padding-right:20px; position:relative; }

.spriteright { position:absolute; top:0; right:0; display:block; width:16px; height:16px; background:url(sprite-vertical.png) transparent no-repeat; }
.spriteright.accept { background-position: 0 0; }
.spriteright.add { background-position: 0 -21px; }
.spriteright.application_cascade { background-position: 0 -42px; }
.spriteright.application_delete { background-position: 0 -63px; }
.spriteright.application_double { background-position: 0 -84px; }
.spriteright.anchor { background-position: 0 -105px; }
.spriteright.application_add { background-position: 0 -126px; }
.spriteright.application_edit { background-position: 0 -147px; }
</style>

<em>This uses an absolutely positioned element within a relative parent to align sprites right.</em>
<!--<div class='rundown clearfix'>
<ul class='pros'>
<li>Cross browser</li>
</ul>
<ul class='cons'>
<li>Extra markup</li>
</ul>-->
</div>

<p><span class='spriteright add'></span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

<p><span class='spriteright accept'></span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

<p><span class='spriteright anchor'></span>Lorem Ipsum...</p>

<?
include('../../includes/footer.php');
?>
