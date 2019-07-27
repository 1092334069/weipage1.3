class MobileAction {
	constructor() {

	}
	getQueryString(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return ''
	}
	doInterfaceList(interfaceList) {
		let list = []
		for (let i = interfaceList.length - 1; i >= 0; i--) {
			list.push({
				url: interfaceList[i].url,
				type: interfaceList[i].type,
				param: interfaceList[i].param,
				dataType: interfaceList[i].dataType
			})
		}
		this.doInterfaceListAction(list)
	}
	doInterfaceListAction(list) {
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
					console.log(res)
				},
				complete: function() {
					if (list.length) {
						_this.doInterfaceListAction(list)
					}
				}
			})
		}
	}
	parseAJaxData(param) {
		const data = {}
		for (let i = 0; i < param.length; i++) {
			data[param[i].key] = this.parseAjaxDataValue(param[i].value)
		}
		return data
	}
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
}

const mobileAction = new MobileAction()

export {
	mobileAction
}
