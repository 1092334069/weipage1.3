const http = require('http'); 
const querystring = require('querystring');

//获取请求链接
function getRequestUrl(reqUrl,reqHead){
	if(reqHead){
		reqUrl = reqUrl.substring(reqHead.length);
	}
	let paramIndex = reqUrl.indexOf("?");
	if(paramIndex >= 0){
	 	return reqUrl.substring(0,paramIndex);
	}else{
	 	return reqUrl;
	}
}

module.exports = {
	getRequestUrl:getRequestUrl
}