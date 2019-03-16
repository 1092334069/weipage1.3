const http = require('http'); 
const querystring = require('querystring');

function parseHostName(hostname){
  if(hostname.indexOf(":") >= 0){
    let h = hostname.split(":");
    return {
      hostname:h[0],
      port:h[1]
    }
  }else{
    return {
      hostname:hostname,
      port:80
    }
  }
}

//发送 http Get 请求 
function httpGet(hostname,path,paramData,successCallBack,failCallBack){
  let postData = querystring.stringify(paramData); 
  let hostResult =  parseHostName(hostname);
  let options = {  
     hostname:hostResult.hostname,  
     port:hostResult.port,  
     path:path + "?" + postData,  
     method:'GET',  
     headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36' 
     }  
  }
  let rqt = http.request(options, function(res) {  
      let backData = "";
      res.setEncoding('utf-8');  
      res.on('data',function(chun){   
          backData += chun;  
          return;     
      });  
      res.on('end',function(){        
          if(successCallBack){
            successCallBack(backData);
          }
          return;
      });
      return;  
  });  
  rqt.on('error',function(err){  
      if(failCallBack){
        failCallBack(err);
      }
      return;     
  }); 
  rqt.end();
  return; 
}

//发送 http Post 请求 
function httpPost(hostname,path,paramData,successCallBack,failCallBack){ 
  let postData = querystring.stringify(paramData); 
  let hostResult =  parseHostName(hostname); 
  let options = {  
     hostname:hostResult.hostname,  
     port:hostResult.port,   
     path:path,  
     method:'POST',  
     headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', 
      'Content-Length':Buffer.byteLength(postData)  
     }  
  }  
  let rqt = http.request(options, function(res) {  
      let backData = "";
      res.setEncoding('utf-8');  
      res.on('data',function(chun){   
          backData += chun;        
          return;       
      });  
      res.on('end',function(end){        
         if(successCallBack){
            successCallBack(backData);
          }
      });
      return; 
  });  
  rqt.on('error',function(err){  
      if(failCallBack){
        failCallBack(err);
      }
      return;    
  });  
  rqt.write(postData);  
  rqt.end(); 
  return;
}

module.exports = {
  httpGet:httpGet,
  httpPost:httpPost
}