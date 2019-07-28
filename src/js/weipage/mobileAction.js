class MobileAction {
	constructor() {
		this.interfaceDataList = []
		this.actionDataList = []
		this.eventDataList = []
	}
	// 获取链接参数
	getQueryString(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return ''
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
		if (count > 100000) {
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
			return this.getQueryString(value.data)
		} else if (value.source === 'cookie') {
			return ''
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
						action: pluginList[i].base.actionList[j],
						plugin: pluginList[i]
					})
				}
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
