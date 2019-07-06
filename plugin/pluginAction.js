import pluginConfig from './pluginConfig.js'

let localKey = ''

$.ajax({
	url: '/api/local/getLocalKey',
	type: 'get',
	data: '',
	dataType: 'json',
	success: function(res) {
		if (res && res.localKey) {
			localKey = res.localKey
		}
	}
})

function getLocalUuid() {
	const timeString = Date.now()
	return 'p' + localKey + timeString
}

function createPlugin(pluginType) {
	if (!localKey) {
		return
	}
	const plugin = JSON.parse(JSON.stringify(pluginConfig[pluginType]))
	plugin['pluginId'] = getLocalUuid()
	return plugin
}

function pluginTreeSelect(pluginId, weipage) {
	let selectPluginDetail
	for (let i = 0; i < weipage.pluginList.length; i++) {
		if (pluginId === weipage.pluginList[i].pluginId) {
			selectPluginDetail = weipage.pluginList[i]
		}
	}

	for (let i = 0; i < weipage.pluginList.length; i++) {
		const pluginDetail = weipage.pluginList[i]
		if (weipage.selectPluginId === pluginDetail.pluginId) {
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
	}
}

export {
	getLocalUuid,
	createPlugin,
	pluginTreeSelect
}