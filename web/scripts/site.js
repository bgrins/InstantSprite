
function loadExample() {
	
	$("section.viewsource").each(function() {
		var el = $(this),
			pre = $('<pre class="html"></pre>').text(el.html());
			
		el.append(pre);
	});
	
	$("style").each(function(i, el) {
		var style = $(this),
			linkedTo = style.attr("data-linked"),
			pre = $('<pre class="css">' + style.html() + '</pre>');
		
		if (linkedTo) {
			$('#' + linkedTo).append(pre)
		}
		else {
			$(document.body).append(pre);
		}
	});

}