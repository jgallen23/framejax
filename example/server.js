var express = require('express');
var form = require('connect-form');
var path = require('path');

var app = express.createServer(
  form({ keepExtensions: true })
);

app.use(express.static(path.join(__dirname, '../lib')));

app.set("view options", {
  layout: false 
});

app.set("view engine", "jade");
app.set("views", "" + __dirname + "/views");

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  req.form.complete(function(err, fields, files){
    if (err) {
      next(err);
    } else {
      console.log(files.img);
      res.send(files.img.path);
    }
  });

  // We can add listeners for several form
  // events such as "progress"
  req.form.on('progress', function(bytesReceived, bytesExpected){
    var percent = (bytesReceived / bytesExpected * 100) | 0;
    process.stdout.write('Uploading: %' + percent + '\r');
  });
});

app.listen(3000);
