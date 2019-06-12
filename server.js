const express = require('express')
const http = require('http')
const bodyParser = require("body-parser")
const querystring = require('querystring')
const multiparty = require('multiparty')
const httpRequest = require('./nodeServer/httpRequest')
const httpUtil = require('./nodeServer/httpUtil')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

var server = app.listen(8090, '0.0.0.0', function() {})

function requestAction(req, res) {
	const pathname = httpUtil.parsePathName(req)
	const param = httpUtil.parseParam(req)
	console.log(pathname)
	const isStatusResource = httpUtil.checkStatusResource(pathname)
	const isApiResource = httpUtil.checkApiResource(pathname)
	if (isStatusResource) {
		res.sendfile(__dirname + pathname)
	} else if (isApiResource) {
		
	} else {
		res.sendfile(__dirname + `/dist${pathname}.html`)
	}
}

app.get('*', requestAction)

app.post('*', requestAction)
