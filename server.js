// Imports
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

//Instantiate server
var server = express();

// Body parser configuration
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

//Configure routes
server.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour sur mon server</h1>');
});

server.use('/api/', apiRouter);

//Launch server
server.listen(8080, function() {
  console.log('Server en écoute');
});
