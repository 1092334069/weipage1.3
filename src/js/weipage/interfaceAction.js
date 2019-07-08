class InterfaceAction {
	constructor() {
		this.weiPageThis = undefined
	}
	init(that) {
		this.weiPageThis = that
	}
	getInterfaceList() {
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
	getInterfaceDetail(interfaceId, callback) {
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
	selectInterface(interfaceId, callback) {
		const _this = this
		this.weiPageThis.closeInterfaceModel()
		this.getInterfaceDetail(interfaceId, (res) => {
			const param = JSON.parse(res.param)
			const paramList = []
			for (let i = 0; i < param.length; i++) {
				let p = param[i]
				if (param[i].type === 'number') {
					p['value'] = {
						data: 0,
						source: 'static'
					}
				} else {
					p['value'] = {
						data: '',
						source: 'static'
					}
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
			callback(interfaceDetail)
			_this.weiPageThis.interfaceTree.push(interfaceDetail)
		})
	}
	weipageSelectInterface(interfaceId) {
		const _this = this
		this.selectInterface(interfaceId, function(interfaceDetail) {
			_this.weiPageThis.weipage.interfaceList.push(interfaceDetail)
			_this.weiPageThis.weipage.selectInterfaceId = interfaceDetail.interfaceId
		})
	}
	eventSelectInterface(interfaceId) {
		const _this = this
		this.selectInterface(interfaceId, function(interfaceDetail) {
			const selectPluginId = _this.weiPageThis.selectPluginId
			const pluginList = _this.weiPageThis.pluginList
			let event
			for (let i = 0; i < pluginList.length; i++) {
				if (pluginList[i].pluginId === selectPluginId) {
					event = pluginList[i].event
				}
			}
			if (event) {
				event.eventList[event.selectIndex].value = JSON.parse(JSON.stringify(interfaceDetail))
			}
		})
		
	}
	deleteInterface(interfaceId) {
		let interfaceList = this.weiPageThis.weipage.interfaceList
		for (let i = interfaceList.length - 1; i >= 0; i--) {
			if (interfaceList[i].interfaceId === interfaceId) {
				interfaceList.splice(i, 1)
			}
		}
		let interfaceTree = this.weiPageThis.interfaceTree
		for (let i = interfaceTree.length - 1; i >= 0; i--) {
			if (interfaceTree[i].interfaceId === interfaceId) {
				interfaceTree.splice(i, 1)
			}
		}
		if (interfaceList.length) {
			this.weiPageThis.weipage.selectInterfaceId = interfaceList[0].interfaceId
		} else {
			this.weiPageThis.weipage.selectInterfaceId = 0
		}
	}
	selectInterfaceParam(option) {
		if (!option) {
			return
		}
		const result = {
			name: option.name,
			url: option.url,
			keyList: []
		}
		for (let i = option.keyList.length - 1; i >= 0; i--) {
			result.keyList.push(option.keyList[i])
		}
		return result
		
	}
	baseActionSelectInterfaceParam(option) {
		const result = JSON.parse(JSON.stringify(this.selectInterfaceParam(option)))
		for (let i = 0; i < this.weiPageThis.pluginList.length; i++) {
			if (this.weiPageThis.selectPluginId === this.weiPageThis.pluginList[i].pluginId) {
				this.weiPageThis.pluginList[i].base.actionList[this.weiPageThis.pluginList[i].base.selectIndex].value = result
			}
		}
	}
	baseAttrSelectInterfaceParam(option) {
		const result = JSON.parse(JSON.stringify(this.selectInterfaceParam(option)))
		for (let i = 0; i < this.weiPageThis.pluginList.length; i++) {
			if (this.weiPageThis.selectPluginId === this.weiPageThis.pluginList[i].pluginId) {
				const attr = this.weiPageThis.pluginList[i].base.attrList[this.weiPageThis.pluginList[i].base.attrSelectIndex]
				attr.name = result.name
				attr.url = result.url
				attr.keyList = result.keyList
			}
		}
	}
	eventSelectStatusInterfaceParam(option) {
		const result = this.selectInterfaceParam(option)
		for (let i = 0; i < this.weiPageThis.pluginList.length; i++) {
			if (this.weiPageThis.selectPluginId === this.weiPageThis.pluginList[i].pluginId) {
				this.weiPageThis.pluginList[i].event.eventList[this.weiPageThis.pluginList[i].event.selectIndex].status.key = result
			}
		}
	}
}

const interfaceAction = new InterfaceAction()

export {
	interfaceAction
}
