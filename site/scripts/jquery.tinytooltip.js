/*
    Kailash Nadh (http://kailashnadh.name)

    tinytooltip
    March 2012
    A tiny tooltip plugin for jQuery

    License :   MIT License
*/
(function($) {

    $.fn.tinytooltip = function(args, parameters) {
        // default options
        var options = {
            message: '',
            hover: true,
            classes: ''
        };

        if (typeof(args) === "string") {

        }

        if(args) {
            $.extend(options, args);
        }

        return this.each(function(){
            var me = $(this);
            if(!me.width()) return false;

            // parent's position
            var pos = me.offset();
            
            // silly hack to calculate the message's width
            var dummy = $('<span class="tooltip_dummy">' + options.message + '</span>').css('visibility', 'hidden');
            $('body').append(dummy);
            var message_width = dummy.width();
            dummy.remove();

            // tooltip html
            var tip = $('<span class="tinytooltip'+ (options.classes ? ' ' + options.classes : '') +'"><span class="arrow"></span><span class="message">' + options.message + '</span></span>');
            tip.width(message_width).css('opacity', 0).hide();
            $('body').append(tip);

            // position the tooltip beside the parent
            tip.css('left', pos.left + (me.outerWidth()/2) - (tip.outerWidth()/2));
            tip.css('top', pos.top + me.outerHeight());

            me.bind( (options.hover ? 'mouseover ' : '') + 'showtooltip', function() {
                tip.show().animate({opacity: 1}, 200);
            });
            me.bind( (options.hover ? 'mouseout ' : '') + 'hidetooltip', function() {
                tip.animate({opacity: 0}, 200, function() {
                    $(this).hide();
                });
            });

            me.bind('destroy', function() {
                me.trigger('hidetooltip');
                tip.remove();
            });
        });
    };
    
    return this;
})(jQuery);