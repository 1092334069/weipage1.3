import pluginConfig from './pluginConfig.js'

function getPluginId() {
	var uid = 1
	var timeString = Date.now()
	return 'p' + timeString + uid
}

function createPlugin(pluginType) {
	var plugin = JSON.parse(JSON.stringify(pluginConfig[pluginType]))
	plugin['pluginId'] = getPluginId()
	return plugin
}

export {
	createPlugin
}