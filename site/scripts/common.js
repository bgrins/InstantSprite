
window.log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

// delay:
// only call a function after a timeout, to prevent rapid fire calls	
var delay = (function() {
	var timeouts = { };
	return function(cb, timeout) {
		if (timeouts[cb]) {
			clearTimeout(timeouts[cb]);
		}
		timeouts[cb] = setTimeout(cb, timeout);
	}
})();

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
