var lastId = 0;
var addEvent = function(node, name, func) {
  if(node.addEventListener) {
    node.addEventListener(name, func, true);
  } else if(node.attachEvent) {
    name = "on"+name;
    node.attachEvent(name, func);
  }
};

var framejax = function(form, callback) {
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
      callback(doc.body.innerHTML);
    };

    addEvent(iframe, 'load', done);
    document.body.appendChild(iframe);
  };
  addEvent(form, 'submit', upload);

  return function () {
    upload();
    form.submit();
  };
};
