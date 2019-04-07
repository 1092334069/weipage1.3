var viewAction = function() {
	this.coordinateList = []
}

viewAction.prototype.buildList = function() {
	var coordinateList = []
	var $pluginList = $('#weipage').find('.plugin')
	for (var i = 0; i < $pluginList.length; i++) {
		var $plugin = $pluginList.eq(i)
		var width = $plugin.outerWidth(true)
		var height = $plugin.outerHeight(true)
		var top = $plugin.offset().top
		var left = $plugin.offset().left
		var parentPluginId = ''
		var parentPlugin = $plugin.parents('.plugin')
		if (parentPlugin.length) {
			parentPluginId = parentPlugin.attr('data-id')
		}
		coordinateList.push({
			pluginId: $plugin.attr('data-id'),
			parentPluginId: parentPluginId,
			top: top,
			left: left,
			right: left + width,
			bottom: top + height
		})
	}
	this.coordinateList = coordinateList
}

viewAction.prototype.operationView = function(coordinate) {
	for (var i = 0; i < this.coordinateList.length; i++) {
		if (this.coordinateList[i].top <= coordinate.top && this.coordinateList[i].left <= coordinate.left && this.coordinateList[i].bottom >= coordinate.bottom && this.coordinateList[i].right >= coordinate.right) {
			return {
				type: 'inside',
				toPluginId: this.coordinate[i].pluginId,
				pluginId: coordinate.pluginId
			}
		} else if (this.coordinateList[i].parentPluginId === coordinate.parentPluginId && this.coordinateList[i].top < coordinate.top) {
			return {
				type: 'before',
				toPluginId: this.coordinate[i].pluginId,
				pluginId: coordinate.pluginId
			}
		}
	}
	return {
		type: 'after',
		pluginId: coordinate.pluginId
	}
}

export default {
	viewAction: function() {
		var plugin = new viewAction()
		return plugin
	}
}