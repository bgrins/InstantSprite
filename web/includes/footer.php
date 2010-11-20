</section>
<script src="<?=docroot?>scripts/require-jquery.js?v={{VERSION}}"></script>
<?php if ($example) { ?>
<script type="text/javascript" src="<?=docroot?>scripts/site.js"></script>
<script type="text/javascript">loadExample();</script>
<? } ?>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8259845-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</body>
</html>