class WeipageAction {
	constructor() {

	}
	insertWeipage(param, callback, errorCallback) {
		$.ajax({
			url: '/api/weipage/insert',
			type: 'get',
			data: {
				name: param.name,
				describes: param.describes,
				cover: param.cover,
				pageName: param.pageName,
				data: JSON.stringify(param.data)
			},
			dataType: 'json',
			success: (res) => {
				if (res && res.code === 200 && res.data) {
					callback(res.data)
				} else if (res) {
					errorCallback(res.message)
				} else {
					errorCallback()
				}
			},
			error: () => {
				errorCallback()
			}
		})
	}
	updateWeipage(param, callback, errorCallback) {
		$.ajax({
			url: '/api/weipage/update',
			type: 'get',
			data: {
				weipageId: param.weipageId,
				name: param.name,
				describes: param.describes,
				cover: param.cover,
				pageName: param.pageName,
				data: JSON.stringify(param.data)
			},
			dataType: 'json',
			success: (res) => {
				if (res && res.code === 200 && res.data) {
					callback(res.data)
				} else if (res) {
					errorCallback(res.message)
				} else {
					errorCallback()
				}
			},
			error: () => {
				errorCallback()
			}
		})
	}
	deleteWeipage() {

	}
	getWeipageList() {

	}
	getWeipageDetail(param, callback) {
		$.ajax({
			url: '/api/weipage/detail',
			type: 'get',
			data: {
				weipageId: param.weipageId
			},
			dataType: 'json',
			success: (res) => {
				if (res && res.code === 200 && res.data) {
					callback(res.data)
				}
			}
		})
	}
}

const weipageAction = new WeipageAction()

export {
	weipageAction
}
