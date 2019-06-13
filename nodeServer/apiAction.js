const http = require('http')
const querystring = require('querystring')
const apiHttpUrl = '119.23.230.249'

function httpGet(parameter, callback) {
	let postData = querystring.stringify(parameter.param)
	let options = {
		hostname: apiHttpUrl,
		port: 9090,
		path: parameter.pathname + '?' + postData,
		method: 'GET',
		headers: parameter.headers
	}
	console.log(options)
	let rqt = http.request(options, (res) => {  
		let backData = ''
		res.setEncoding('utf-8');  
		res.on('data', (chun) => {
		backData += chun
			return
		}) 
		res.on('end', () => {
			callback(backData)
			return
		})
		return
	})
	rqt.on('error', (err) => {
		callback({code: 502, message: '网络异常，请稍后重试' })
      	return
	})
	rqt.end()
}

function httpPost(parameter, callback){ 
	let postData = querystring.stringify(parameter.param)
	let options = {
		hostname: apiHttpUrl,
		port: 9090,
		path: parameter.pathname,
		method: 'POST',
		headers: parameter.headers
	}  
	let rqt = http.request(options, (res) => {  
	let backData = ''
		res.setEncoding('utf-8')
		res.on('data', (chun) => {
			backData += chun       
			return
		})
		res.on('end', (end) => {        
			callback(backData)
		})
		return
	})
	rqt.on('error', (err) => {  
		callback({code: 502, message: '网络异常，请稍后重试' })
		return
	})
	rqt.write(postData)
	rqt.end()
}

function httpRequest(parameter, callback) {
	if (parameter === 'POST') {
		httpPost(parameter, callback)
	} else {
		httpGet(parameter, callback)
	}
}

const interfaceInfo = {
	getPageList: function(parameter, callback) {
		httpRequest(parameter, callback)
	}
}

module.exports = {
	interfaceInfo
}