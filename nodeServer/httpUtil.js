const statusReg = /\.(js|css|png|jpg|gif)$/
const apiReg = /^\/api/g

function parsePathName(req) {
	if (req && req._parsedUrl) {
		return req._parsedUrl.pathname
	} else {
		return ''
	}
}

function parseParam(req) {
	if (req) {
		return req.query
	} else {
		return {}
	}
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
