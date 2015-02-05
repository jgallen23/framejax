(function($) {
  var lastId = 0;
  var createiFrame = function(id) {
    return $('<iframe name="'+id+'" />')
      .attr({
        id: id,
        name: id,
        width: 0,
        height: 0
      })
      .css('display', 'none')
      .appendTo('body');
  };

  $.fn.framejax = function(opts) {
    opts = opts || {};

    var validate = opts.validate || function() {
      return true;
    };

    return this.each(function() {
      var el = $(this);
      if (el[0].tagName != 'FORM') {
        throw new Error('all selectors must be form tags');
      }

      var submit = function() {
        var id = '__framejax__' + lastId++;
        var iframe = createiFrame(id);

        iframe.on('load', function() {
          var $body = $(this).contents().find('body');
          var results = $body.html();
          var eventName = 'framejax.success';

          el.trigger('complete', results);

          if (!validate($(this))) {
            eventName = 'framejax.error';
          }
          el.trigger(eventName, [iframe, $body]);

          //cleanup
          iframe.remove();
        });

        el.attr('target', id);
      };

      el.on('submit', submit);
      el.on('framejaxSubmit', submit);
    });
  };
})(window.jQuery);
