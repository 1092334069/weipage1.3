const apiRouter = require('./apiRouter')

function apiRequest(parameter, requestResult) {
	for (let i = 0; i < apiRouter.length; i++) {
		if (parameter.pathname === apiRouter[i].pathname) {
			apiRouter[i].action(parameter, (res) => {
				if (res) {
					requestResult.json(JSON.parse(res))
				} else {
					requestResult.json({code: 501, message: '网络异常，请稍后重试' })
				}
			})
			return
		}
	}
	requestResult.json({code: 401, message: '没有找到接口' })
}

module.exports = {
	apiRequest
}