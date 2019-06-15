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
		headers: {
			'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
			'User-Agent': parameter.headers['user-agent']
		}
	}
	let rqt = http.request(options, (res) => {
		let backData = ''
		res.setEncoding('utf-8');  
		res.on('data', (chun) => {
			backData += chun
		}) 
		res.on('end', (end) => {
			callback(backData)
		})
	})
	rqt.on('error', (err) => {
		callback({code: 502, message: '网络异常，请稍后重试' })
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
		headers: {
			'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
			'User-Agent': parameter.headers['user-agent']
		}
	}  
	let rqt = http.request(options, (res) => {  
	let backData = ''
		res.setEncoding('utf-8')
		res.on('data', (chun) => {
			backData += chun
		})
		res.on('end', (end) => {        
			callback(backData)
		})
	})
	rqt.on('error', (err) => {  
		callback({code: 502, message: '网络异常，请稍后重试' })
	})
	rqt.write(postData)
	rqt.end()
}

function serverRequest(parameter, callback) {
	if (parameter === 'POST') {
		httpPost(parameter, callback)
	} else {
		httpGet(parameter, callback)
	}
}

module.exports = {
	serverRequest
}