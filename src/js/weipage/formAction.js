const formAction = {
	parseKeyList(pname, name, value) {
		const keyList = []
		if (pname) {
				keyList.push(pname)
		}
		if (name) {
			const nameList = name.split('.')
			for (let i = 0; i < nameList.length; i++) {
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
		const key = keyList.splice(0, 1)
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
		for (let i = 0; i < source.pluginList.length; i++) {
			if (pluginId === source.pluginList[i].pluginId) {
				if (callback) {
					callback(source.pluginList, i, source)
				}
				return source.pluginList[i]
			}
			if (source.pluginList[i].pluginList && source.pluginList[i].pluginList.length) {
				const res = formAction.searchPluginDeep(count, source.pluginList[i], pluginId, callback)
				if (res) {
					return res
				}
			}
		}
		return false
	}
}

function pluginUpdate(res, formData){
	const keyList = formAction.parseKeyList(res.pname, res.name)
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
	if (pluginId === moveToPluginId) {
		return
	}
	const moveToPlugin = pluginSearch(weipage, moveToPluginId)
	if (moveToPlugin.pluginType !== 'panel' && type === 'inside') {
		return
	}
	formAction.searchPluginDeep(0, weipage, pluginId, function(searchPluginList, i){
		const movePlugin = searchPluginList.splice(i, 1)
		if (movePlugin && movePlugin.length) {
			if (type == 'inside') {
				formAction.searchPluginDeep(0, weipage, moveToPluginId, function(resPluginList, i){
					resPluginList[i].pluginList.push(movePlugin[0])
				})
			} else if (type == 'before') {
				formAction.searchPluginDeep(0, weipage, moveToPluginId, function(resPluginList, i, origin){
					const tempList = []
					for (let j = 0; j < resPluginList.length; j++) {
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

function pluginTreeSelect(weipage, pluginId) {
	let selectPluginDetail = pluginSearch(weipage, pluginId)
	let pluginDetail = pluginSearch(weipage, weipage.selectPluginId)
	if (selectPluginDetail) {
		const eventOptions = []
		for (let i = 0; i < selectPluginDetail.base.actionList.length; i++){
			if (selectPluginDetail.base.actionList[i].condition === 'event') {
				eventOptions.push({
					label: selectPluginDetail.base.actionList[i].name,
					value: selectPluginDetail.base.actionList[i].actionId
				})
			}
		}
		if (eventOptions.length) {
			pluginDetail.event.eventList[pluginDetail.event.selectIndex].value = {
				name: selectPluginDetail.base.name,
				id: pluginId,
				options: eventOptions,
				actionName: eventOptions[0].label,
				actionId: eventOptions[0].value
			}
		} else {
			pluginDetail.event.eventList[pluginDetail.event.selectIndex].value = {
				name: selectPluginDetail.base.name,
				id: pluginId,
				options: [],
				actionName: '',
				actionId: ''
			}
		}
	}
}

function formTreeSelect(weipage, pluginId) {
	let selectPluginDetail = pluginSearch(weipage, pluginId)
	let pluginDetail = pluginSearch(weipage, weipage.selectPluginId)
	if (selectPluginDetail && selectPluginDetail.base.key) {
		console.log(selectPluginDetail.base.key)
	}
}

export {
	pluginUpdate,
	pluginSearch,
	pluginMove,
	pluginRemove,
	pluginTreeSelect,
	formTreeSelect
}