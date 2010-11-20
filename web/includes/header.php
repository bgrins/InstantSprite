<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title><?=$title?> - Instant Sprite</title>
	<? 
	if (!isset($description)) { $description = ""; }
	
	// point root to whatever it currently is (/, or /~user/dev/, or /staging/, etc)
	$spliturl = preg_split("/(articles|faq|feedback)/", $_SERVER['SCRIPT_NAME'], null, PREG_SPLIT_DELIM_CAPTURE);
	define('docroot',  (count($spliturl) > 1) ? $spliturl[0] : '/');
	define('currentlink', (count($spliturl) > 1) ? $spliturl[1]: '');
	
	function createlink($name, $href, $class) {
		$fullurl = docroot.$href;
		$iscurrent = trim($href, '/') == currentlink;
		$fullclass = ($iscurrent) ? $class . ' current' : $class;
		return "<a href='$fullurl' class='$fullclass'>$name</a>";
	}
	?>
	<meta name="description" content="<?=$description?>">
	<link type="text/css" media="screen" rel="stylesheet" href="<?=docroot?>styles/instantsprite.css?v={{VERSION}}">
</head>
<body>
<header>
<h1><a href='<?=docroot?>'>Instant Sprite</a></h1>
<div class='links'>
<?=createlink('Articles', 'articles/', 'icon page_white_stack')?>
<?=createlink('FAQ', 'faq/', 'icon help')?>
<?=createlink('Feedback', 'feedback/', 'icon comments')?>
</div>
</header>

<? if ($example) { ?><section id="example">
<? } else { ?><section><? } ?>

<? if (!isset($hidetitle)) { ?>
<h2><?=$title?></h2>
<? } ?>
