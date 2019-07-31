const apiRouter = require('./apiRouter')

function apiRequest(parameter, requestResult) {
	try {
		for (let i = 0; i < apiRouter.length; i++) {
			if (parameter.pathname === apiRouter[i].pathname) {
				apiRouter[i].action(parameter, (res) => {
					if (res) {
						requestResult.json(JSON.parse(res))
					} else {
						requestResult.json({code: 501, message: '网络异常，请稍后重试' })
					}
				}, requestResult)
				return
			}
		}
		requestResult.json({code: 401, message: '没有找到接口' })
	}  catch (e) {
		requestResult.json({code: 505, message: 'api请求失败'})
	}
}

module.exports = {
	apiRequest
}