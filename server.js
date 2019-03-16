const express = require('express');
const http = require('http'); 
const bodyParser = require("body-parser"); 
const querystring = require('querystring');
const multiparty = require('multiparty');
const httpRequest = require('./nodeServer/httpRequest.js');
const httpAction = require('./nodeServer/httpAction.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(8090, function () {
});

app.post('*', function (req, res) {

    setTimeout(function(){
     
        res.json(JSON.parse('{"status":1,"result":0,"codeInfo":{"code":1001},"title":"标题","content":"这里是内容区域","image":{"imageUrl":"./temp/E7A7093C9008A2AFB46D332BA92664DF.png"}}'));  
                   
    },2000);               

});

app.get("/index",function(req,res){
   res.sendfile( __dirname+'/dist/index.html');  
});

app.get("*",function(req,res){
   let url = httpAction.getRequestUrl(req.url);
   res.sendfile( __dirname+url);  
});
