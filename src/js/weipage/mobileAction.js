class MobileAction {
	constructor() {
		this.interfaceDataList = []
		this.actionDataList = []
		this.eventDataList = []
	}
	// 获取链接参数
	getQueryParam(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return ''
	}
	// 获取缓存参数
	getSessionStorageParam(key) {
		if (typeof sessionStorage[key] === 'number' || typeof sessionStorage[key] === 'string' || typeof sessionStorage[key] === 'object') {
			return sessionStorage[key]
		} else {
			return ''
		}
	}
	// 获取表单参数
	getFormParam(name) {
		const selector = $(`.form-input[name='${name}']`)
		if (selector.length) {
			return selector.val()
		} else {
			return ''
		}
	}
	// 执行接口列表
	doInterfaceList(interfaceList, resCallback) {
		let list = []
		for (let i = interfaceList.length - 1; i >= 0; i--) {
			list.push({
				url: interfaceList[i].url,
				type: interfaceList[i].type,
				param: interfaceList[i].param,
				dataType: interfaceList[i].dataType
			})
		}
		this.doInterfaceListAction(0, list, resCallback)
	}
	// 执行接口响应
	doInterfaceListAction(count, list, resCallback) {
		if (count > 100000 || !list || !list.length) {
			return
		}
		const _this = this
		for (let i = list.length - 1; i >= 0; i--) {
			const item = list.splice(i, 1)
			let param = {}
			if (item && item.length) {
				param = item[0]
			}
			$.ajax({
				url: param.url,
				type: param.type,
				data: this.parseAJaxData(param.param),
				dataType: param.dataType,
				success: function(res) {
					if (res) {
						_this.setInterfaceData(param.url, res)
					}
				},
				complete: function() {
					if (list.length) {
						_this.doInterfaceListAction(count += 1, list, resCallback)
					} else {
						resCallback()
					}
				}
			})
		}
	}
	// 执行响应
	doAction(actionItem){
		const actionData = this.parseActionDataValue(actionItem.action.type, actionItem.action.value)
		const actionKeyList = actionItem.action.key.split('.')
		if (actionKeyList && actionKeyList.length > 1) {
			if (actionKeyList[0] === 'base') {
				actionItem.plugin.base[actionKeyList[1]] = actionData
			} else if (actionKeyList[0] === 'style') {
				actionItem.plugin.style[actionKeyList[1]] = actionData
			}
		}
	}
	// 执行对应id的响应
	doActionById(actionId) {
		for (let i = 0; i < this.actionDataList.length; i++) {
			const actionItem = this.actionDataList[i]
			if (actionItem.action && actionItem.actionId === actionId) {
				this.doAction(actionItem)
			}
		}
	}
	// 执行加载响应
	doLoadingAction() {
		for (let i = 0; i < this.actionDataList.length; i++) {
			const actionItem = this.actionDataList[i]
			if (actionItem.action && actionItem.action.condition === 'loading') {
				this.doAction(actionItem)
			}
		}
	}
	// 执行事件列表
	doEventList(count, eventList) {
		if (count > 100000 || !eventList || !eventList.length) {
			return
		}
		for (let i = eventList.length - 1; i >= 0; i--) {
			const item = eventList.splice(i, 1)
			let event = {}
			if (item && item.length) {
				event = item[0]
			}
			if (event.type && event.value && event.type === 'interface') {
				const interfaceList = []
				interfaceList.push({
					url: event.value.url,
					type: event.value.type,
					param: event.value.param,
					dataType: event.value.dataType
				})
				this.doInterfaceListAction(0, interfaceList, () => {
					this.doEventList(count += 1, eventList)
				})
			} else {
				this.doEventList(count += 1, eventList)
			}
		}
	}
	// 执行事件列表
	doPluginEvent(pluginId) {
		for (let i = 0; i < this.eventDataList.length; i++) {
			if (this.eventDataList[i].pluginId === pluginId) {
				const eventList = []
				if (this.eventDataList[i].eventList && this.eventDataList[i].eventList.length) {
					for (let j = this.eventDataList[i].eventList.length - 1; j >= 0; j--) {
						eventList.push(this.eventDataList[i].eventList[j])
					}
				}
				this.doEventList(0, eventList)
				break
			}
		}
	}
	// 解析请求参数
	parseAJaxData(param) {
		const data = {}
		for (let i = 0; i < param.length; i++) {
			data[param[i].key] = this.parseAjaxDataValue(param[i].value)
		}
		return data
	}
	// 解析参数来源
	parseAjaxDataValue(value) {
		if (value.source === 'static') {
			return value.data
		} else if (value.source === 'url') {
			return this.getQueryParam(value.data)
		} else if (value.source === 'sessionStorage') {
			return this.getSessionStorageParam(value.data)
		} else if (value.source === 'form') {
			return this.getFormParam(value.data)
		} else {
			return ''
		}
	}
	// 解析配置数据
	parseConfigurationDataList(count, pluginList) {
		if (count > 100000) {
			return
		}
		for (let i = 0; i < pluginList.length; i++) {
			if (pluginList[i].base && pluginList[i].base.actionList && pluginList[i].base.actionList.length) {
				for (let j = 0; j < pluginList[i].base.actionList.length; j++) {
					this.actionDataList.push({
						actionId: pluginList[i].base.actionList[j].actionId,
						action: pluginList[i].base.actionList[j],
						plugin: pluginList[i]
					})
				}
			}
			if (pluginList[i].event && pluginList[i].event.eventList && pluginList[i].event.eventList.length) {
				this.eventDataList.push({
					pluginId: pluginList[i].pluginId,
					eventList: pluginList[i].event.eventList
				})
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				this.parseConfigurationDataList(count += 1, pluginList[i].pluginList)
			}
		}
	}
	// 获取相应数据值
	parseActionDataValue(type, value) {
		if (type === 'interface') {
			return this.getInterfaceKeyData(value.url, value.keyList)
		}
	}
	// 设置接口数据
	setInterfaceData(url, data) {
		this.interfaceDataList.push({
			url,
			data
		})
	}
	// 获取接口数据
	getInterfaceData(url) {
		let data = {}
		for (let i = 0; i < this.interfaceDataList.length; i++) {
			if (url === this.interfaceDataList[i].url) {
				data = this.interfaceDataList[i].data
			}
		}
		return data
	}
	// 获取接口键值
	getInterfaceKeyData(url, keyList) {
		try {
			let data = JSON.parse(JSON.stringify(this.getInterfaceData(url)))
			for (let i = 0; i < keyList.length; i++) {
				if (typeof data[keyList[i]] === 'undefined') {
					if (Array.isArray(data)) {
						let list = []
						for (let j = 0; j < data.length; j++) {
							list.push(data[j][keyList[i]])
						}
						data = list
					} else {
						data = ''
					}
				} else {
					data = data[keyList[i]]
				}
			}
			return data
		} catch (e) {
			return ''
		}
	}
}

const mobileAction = new MobileAction()

export {
	mobileAction
}
