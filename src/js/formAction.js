var formAction = {
	parseKeyList(pname, name, value) {
		var keyList = []
		if (pname) {
				keyList.push(pname)
		}
		if (name) {
			var nameList = name.split('.')
			for (var i = 0; i < nameList.length; i++) {
				keyList.push(nameList[i])
			}
		}
		return keyList
	},
	changePluginData(count, keyList, obj, value) {
		if (count > 10000) {
			return
		}
		if (!keyList.length) {
			return
		}
		count ++
		var key = keyList.splice(0, 1)
		if (obj.hasOwnProperty(key)) {
			if (keyList.length) {
				return formAction.changePluginData(count, keyList, obj[key], value)
			} else {
				obj[key] = value
			}
		}
	},
	searchPluginDeep(count, pluginList, pluginId) {
		if (count > 10000) {
			return false
		}
		count ++
		for (var i = 0; i < pluginList.length; i++) {
			if (pluginId === pluginList[i].pluginId) {
				return pluginList[i]
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				var res = formAction.searchPluginDeep(count, pluginList[i].pluginList, pluginId)
				if (res) {
					return res
				}
			}
		}
		return false
	}
}

function formUpdate(res, formData){
	var keyList = formAction.parseKeyList(res.pname, res.name)
	formAction.changePluginData(0, keyList, formData, res.value)
}

function searchPlugin(pluginList, pluginId) {
	if (pluginList.length) {
		return formAction.searchPluginDeep(0, pluginList, pluginId)
	} else {
		return false
	}
}

export {
	formUpdate,
	searchPlugin
}