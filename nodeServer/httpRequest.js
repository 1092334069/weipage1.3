const apiRouter = require('./apiRouter')

function apiRequest(parameter, res) {
	for (let i = 0; i < apiRouter.length; i++) {
		if (parameter.pathname === apiRouter[i].pathname) {
			apiRouter[i].action(parameter, function(res) {
				if (res) {
					res.json(res)
				} else {
					res.json(JSON.parse(JSON.stringify({code: 501, message: '网络异常，请稍后重试' })))
				}
			})
			return
		}
	}
	res.json(JSON.parse(JSON.stringify({code: 401, message: '没有找到接口' })))
}

module.exports = {
	apiRequest
}