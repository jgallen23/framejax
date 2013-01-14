var express = require('express');
var path = require('path');

var app = express();


app.configure(function() {
  app.use(express.bodyParser({ uploadDir: path.join(__dirname, 'uploads'), keepExtensions: true }));
  app.use(express.static(path.join(__dirname, '../components')));
  app.use(express.static(path.join(__dirname, '../lib')));
});

app.set("view options", {
  layout: false 
});

app.set("view engine", "jade");
app.set("views", "" + __dirname + "/views");

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  console.log(req.files);
  res.send(req.files.img.path);
});

app.listen(8001);
