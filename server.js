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
		res.sendFile(__dirname + pathname)
	} else if (isApiResource) {
		httpRequest.apiRequest({
			method: req.method,
			headers: req.headers,
			pathname: pathname,
			param: param,
			req: req
		}, res)
	} else {
		res.sendFile(__dirname + `/dist${pathname}.html`)
	}
}

app.get('*', requestAction)

app.post('*', requestAction)
