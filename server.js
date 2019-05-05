const express = require('express');
const http = require('http'); 
const bodyParser = require("body-parser"); 
const querystring = require('querystring');
const multiparty = require('multiparty');
const httpRequest = require('./nodeServer/httpRequest.js');
const httpAction = require('./nodeServer/httpAction.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(8090, '0.0.0.0', function () {
});

app.post('*', function (req, res) {           

});

app.get("/index",function(req,res){
   res.sendfile( __dirname+'/dist/index.html');  
});

app.get("*",function(req,res){
   let url = httpAction.getRequestUrl(req.url);
   res.sendfile( __dirname+url);  
});
