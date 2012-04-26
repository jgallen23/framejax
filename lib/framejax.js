!function($) {
  var lastId = 0;
  var createiFrame = function(id) {
    return $('<iframe/>')
      .attr({
        id: id,
        name: id,
        width: 0,
        height: 0
      })
      .css('display', 'none')
      .appendTo('body');
  }

  $.fn.framejax = function(opts) {
    return this.each(function() {
      var el = $(this);
      if (el[0].tagName != 'FORM')
        throw new Error('all selectors must be form tags');

      el.on('submit', function() {
        var id = '__framejax__' + lastId++;
        var iframe = createiFrame(id);

        iframe.on('load', function() {
          var results = $(this).contents().find('body').html();
          el.trigger('complete', results);
        });

        el.attr('target', id);
      });
    });
  };
}(window.jQuery);
