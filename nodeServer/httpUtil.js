const statusReg = /\.(js|css|png|jpg|gif|woff|woff2|ttf|map)$/
const apiReg = /^\/api/

function parsePathName(req) {
	if (req && req._parsedUrl) {
		return req._parsedUrl.pathname
	} else {
		return ''
	}
}

function parseParam(req) {
	let param = {}
	if (req) {
		if (req.method === 'POST') {
			param = req.body
		} else {
			param = req.query
		}
		if (req.cookies) {
			if (req.cookies.userIdStr) {
				param['userIdStr'] = req.cookies.userIdStr
			}
			if (req.cookies.token) {
				param['token'] = req.cookies.token
			}
		}
	}
	return param
}

function checkStatusResource(pathname) {
	const isStatusResource = statusReg.exec(pathname)
	if (isStatusResource) {
		return true
	} else {
		return false
	}
}

function checkApiResource(pathname) {
	const isApiResource = apiReg.exec(pathname)
	if (isApiResource) {
		return true
	} else {
		return false
	}
}

module.exports = {
	parsePathName,
	parseParam,
	checkStatusResource,
	checkApiResource
}
