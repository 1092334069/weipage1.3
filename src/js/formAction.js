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
	searchPluginDeep(count, pluginList, pluginId, source, callback) {
		if (count > 10000 || !pluginList) {
			return false
		}
		count ++
		for (var i = 0; i < pluginList.length; i++) {
			if (pluginId === pluginList[i].pluginId) {
				if (callback) {
					callback(pluginList, i, source)
				}
				return pluginList[i]
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				var res = formAction.searchPluginDeep(count, pluginList[i].pluginList, pluginId, pluginList[i], callback)
				if (res) {
					return res
				}
			}
		}
		return false
	}
}

function pluginUpdate(res, formData){
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

function pluginMove(pluginList, type, pluginId, moveToPluginId, source) {
	if (pluginId == moveToPluginId) {
		return
	}
	formAction.searchPluginDeep(0, pluginList, pluginId, source, function(searchPluginList, i){
		var movePlugin = searchPluginList.splice(i, 1)
		if (movePlugin && movePlugin.length) {
			if (type == 'inside') {
				formAction.searchPluginDeep(0, pluginList, moveToPluginId, source, function(resPluginList, i){
					resPluginList[i].pluginList.push(movePlugin[0])
				})
			} else if (type == 'before') {
				formAction.searchPluginDeep(0, pluginList, moveToPluginId, source, function(resPluginList, i, origin){
					var tempList = []
					for (var j = 0; j < resPluginList.length; j++) {
						if (i === j) {
							tempList.push(movePlugin[0])
						}
						tempList.push(resPluginList[j])
					}
					origin.pluginList = tempList
				})
			} else {
				pluginList.push(movePlugin[0])
			}
		}
	})
}

export {
	pluginUpdate,
	searchPlugin,
	pluginMove
}