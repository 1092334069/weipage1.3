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

export {
	getLocalUuid,
	createPlugin
}