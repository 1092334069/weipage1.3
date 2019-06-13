const apiServer = require('./apiServer')

const interfaceInfo = {
	getPageList: function(parameter, callback) {
		apiServer.serverRequest(parameter, callback)
	}
}

module.exports = {
	interfaceInfo
}