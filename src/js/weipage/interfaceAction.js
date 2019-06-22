const interfacePlugin = function() {
	this.weiPageThis = undefined

	this.interfaceTable = [
		{title: '接口名称', key: 'name'},
		{title: '接口地址', key: 'url'},
		{title: '操作', key: 'action', render: (h, params) => {
			return h('Button', {
				on: {
					click: () => {
						this.selectInterface(params.row.id)
					}
				}
			}, '选取')
		}}
	]
}

interfacePlugin.prototype.init = function(that) {
	this.weiPageThis = that
}

interfacePlugin.prototype.getInterfaceList = function() {
	const _this = this
	$.ajax({
		url: '/api/interface/getPageList',
		type: 'get',
		data: {
			page: 1,
			size: 10
		},
		dataType: 'json',
		success: (res) => {
			if (res && res.code === 200 && res.data) {
				_this.weiPageThis.interfaceTableData = res.data.list
			}
		}
	})
}

interfacePlugin.prototype.getInterfaceDetail = function(interfaceId, callback) {
	$.ajax({
		url: '/api/interface/detail',
		type: 'get',
		data: {
			interfaceId: interfaceId
		},
		dataType: 'json',
		success: (res) => {
			if (res && res.code === 200 && res.data) {
				callback(res.data)
			}
		}
	})
}

interfacePlugin.prototype.selectInterface = function(interfaceId) {
	const _this = this
	this.weiPageThis.closeInterfaceModel()
	this.getInterfaceDetail(interfaceId, (res) => {
		const param = JSON.parse(res.param)
		const paramList = []
		for (let i = 0; i < param.length; i++) {
			let p = param[i]
			if (param[i].type === 'number') {
				p['value'] = 0
			} else {
				p['value'] = ''
			}
			paramList.push(p)
		}
		const interfaceDetail = {
			interfaceId: res.interfaceId,
			name: res.name,
			url: res.url,
			type: res.type,
			dataType: res.dataType,
			callbackParam: JSON.parse(res.callbackParam),
			param: paramList
		}
		_this.weiPageThis.weipage.interfaceList.push(interfaceDetail)
		_this.weiPageThis.weipage.selectInterfaceId = res.interfaceId
		_this.weiPageThis.interfaceTree.push(interfaceDetail)
	})
}

interfacePlugin.prototype.selectInterfaceParam = function(name) {
	for (let i = 0; i < _this.weiPageThis.pluginList.length; i++) {
		if (_this.weiPageThis.selectPluginId === _this.weiPageThis.pluginList[i].pluginId) {
			_this.weiPageThis.pluginList[i].base.actionList[_this.weiPageThis.pluginList[i].base.selectIndex].value = name
		}
	}
}

function interfaceAction(option) {
	const temp = new interfacePlugin()
	if (option) {
		temp.init(option.that)
	}
	console.log(option)
	return temp
}

export {
	interfaceAction
}
