const express = require('express')
const http = require('http')
const bodyParser = require("body-parser")
const querystring = require('querystring')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const httpRequest = require('./nodeServer/httpRequest')
const httpUtil = require('./nodeServer/httpUtil')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

var server = app.listen(8090, '0.0.0.0', function() {})

function requestAction(req, res) {
	const pathname = httpUtil.parsePathName(req)
	const param = httpUtil.parseParam(req)
	const isStatusResource = httpUtil.checkStatusResource(pathname)
	const isApiResource = httpUtil.checkApiResource(pathname)
	if (isStatusResource) {
		try {
			res.sendFile(__dirname + pathname)
		} catch (e) {
			res.json({code: 404, message: '找不到对应文件'})
		}
	} else if (isApiResource) {
		try {
			httpRequest.apiRequest({
				method: req.method,
				headers: req.headers,
				pathname: pathname,
				param: param,
				req: req
			}, res)
		} catch (e) {
			res.json({code: 504, message: 'api请求失败'})
		}
	} else {
		try {
			res.sendFile(__dirname + `/dist${pathname}.html`)
		} catch (e) {
			res.json({code: 404, message: '找不到对应文件'})
		}
	}
}

app.get('*', requestAction)

app.post('*', requestAction)
