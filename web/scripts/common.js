
function log() {
	if (window.console) {
		console.log(Array.prototype.slice.call(arguments)); 
	}
};

// Small jQuery plugin definitions
(function($) {

// $.fn.fitInputToWidth
// Keep an input's width in sync with it's text.  Seems like there should
// be an easier way to do this.  Oh well...
$.fn.fitInputToWidth = function() {
	
	function fitToWidth() {
		var input = $(this),
			outerDiff = input.outerWidth(true) - input.width(),
			text = (input.val() || input.attr("placeholder")) + "|",
			el = $("<span />").text(text).css({
					position:'absolute',
					visibility: 'hidden',
					fontSize: input.css("font-size"),
					fontFamily: input.css("font-family"),
					top: -100, 
					left: -100
				}).appendTo($("body")),
			measuredWidth = el.width();
		
		el.remove();
		
		input.width(measuredWidth + outerDiff);
	}
	
	return this.each(function() {
		fitToWidth.apply(this);
		$(this).bind("keyup keydown", fitToWidth);
	});
	
};

})(jQuery);
