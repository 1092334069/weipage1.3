const apiAction = require('./apiAction')

const apiRouter = [{
	pathname: '/api/interface/getPageList',
	action: apiAction.interfaceInfo.getPageList
}]

module.exports = apiRouter