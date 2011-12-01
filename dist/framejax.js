/*!
  * framejax 
  * v0.0.2
  * https://github.com/jgallen23/framejax
  * copyright JGA 2011
  * MIT License
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('framejax', function() {

var lastId = 0;
var addEvent = function(node, name, func) {
  if(node.addEventListener) {
    node.addEventListener(name, func, true);
  } else if(node.attachEvent) {
    name = "on"+name;
    node.attachEvent(name, func);
  }
};

var framejax = function(form, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  var upload = function() {
    var id = '__framejax__' + lastId++;
    var iframe = document.createElement('iframe');
    iframe.name = id;
    iframe.id = id;
    iframe.width = "0";
    iframe.height = "0";
    iframe.style.display = "none";
    form.target = id;

    var done = function() {
      var iframe = document.getElementById(id);
      var doc = null;
      if (iframe.contentDocument) 
        doc = iframe.contentDocument;
      if (iframe.contentWindow)
        doc = iframe.contentWindow.document;
      callback(doc.body.innerText);
    };

    addEvent(iframe, 'load', done);
    document.body.appendChild(iframe);
  };
  addEvent(form, 'submit', upload);
  return upload;
};

return framejax;
});
