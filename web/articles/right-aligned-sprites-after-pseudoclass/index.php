<?
$title = 'Right Aligned Sprites Using :after';
$description = 'Right Aligned Sprites Using :after';
$example = true;
include('../../includes/header.php');
?>

<style type='text/css'>
.spriteright { position:relative; padding-right:20px;}
.spriteright:after { 
	background:url(sprite-vertical.png) transparent no-repeat;
	height: 16px; 
	width:16px; 
	position:absolute; 
	top:0; 
	right:0; 
	display:block; 
	content: '';
}

.spriteright.accept:after { background-position: 0 0; }
.spriteright.add:after { background-position: 0 -21px; }
.spriteright.application_cascade:after { background-position: 0 -42px; }
.spriteright.application_delete:after { background-position: 0 -63px; }
.spriteright.application_double:after { background-position: 0 -84px; }
.spriteright.anchor:after { background-position: 0 -105px; }
.spriteright.application_add:after { background-position: 0 -126px; }
.spriteright.application_edit:after { background-position: 0 -147px; }    
</style>

<em>This is an experimental example.  It uses the :after pseudo class, and will not work in IE &lt;= 7</em>

<p class="spriteright add">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

<p class="spriteright accept">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

<p class='spriteright anchor'>Lorem Ipsum...</p>

<?
include('../../includes/footer.php');
?>
