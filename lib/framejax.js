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
    var validate = opts.validate || function() {
      return true;
    };

    return this.each(function() {
      var el = $(this);
      if (el[0].tagName != 'FORM')
        throw new Error('all selectors must be form tags');

      var submit = function() {
        var id = '__framejax__' + lastId++;
        var iframe = createiFrame(id);

        iframe.on('load', function() {
          var results = $(this).contents().find('body').html();
          el.trigger('complete', results);

          if (!validate($(this))) {
            el.trigger('framejax.error', iframe);
          }
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
