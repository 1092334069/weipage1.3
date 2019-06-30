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
	searchPluginDeep(count, source, pluginId, callback) {
		if (count > 10000 || !source.pluginList) {
			return false
		}
		count ++
		for (var i = 0; i < source.pluginList.length; i++) {
			if (pluginId === source.pluginList[i].pluginId) {
				if (callback) {
					callback(source.pluginList, i, source)
				}
				return source.pluginList[i]
			}
			if (source.pluginList[i].pluginList && source.pluginList[i].pluginList.length) {
				var res = formAction.searchPluginDeep(count, source.pluginList[i], pluginId, callback)
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

function pluginSearch(weipage, pluginId) {
	if (weipage.pluginList.length) {
		return formAction.searchPluginDeep(0, weipage, pluginId)
	} else {
		return false
	}
}

function pluginMove(weipage, type, pluginId, moveToPluginId) {
	if (pluginId == moveToPluginId) {
		return
	}
	formAction.searchPluginDeep(0, weipage, pluginId, function(searchPluginList, i){
		var movePlugin = searchPluginList.splice(i, 1)
		if (movePlugin && movePlugin.length) {
			if (type == 'inside') {
				formAction.searchPluginDeep(0, weipage, moveToPluginId, function(resPluginList, i){
					resPluginList[i].pluginList.push(movePlugin[0])
				})
			} else if (type == 'before') {
				formAction.searchPluginDeep(0, weipage, moveToPluginId, function(resPluginList, i, origin){
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
				weipage.pluginList.push(movePlugin[0])
			}
		}
	})
}

function pluginRemove(weipage, pluginId) {
	formAction.searchPluginDeep(0, weipage, pluginId, function(resPluginList, i) {
		resPluginList.splice(i, 1)
	})
}

export {
	pluginUpdate,
	pluginSearch,
	pluginMove,
	pluginRemove
}