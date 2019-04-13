var $sourcePlugin = $('body')
var $dropPlugin
var dropData = {
	clientY: 0,
	clientX: 0,
	offsetY: 0,
	offsetX: 0
}

var dropPlugin = function(option) {
	this.option = {}
	if (option) {
		this.option = option
	}
}

dropPlugin.prototype.init = function() {
	this.bindEvent()
}

dropPlugin.prototype.bindEvent = function() {
	var _this = this

	$(document).on('mousedown', '.plugin', function(e) {
		$sourcePlugin = $(this)
		$(this).addClass('drop')
		_this.mouseDownEvent(e, this)
	})

	$(document).on('mousemove', '.plugin', function(e) {
		if ($dropPlugin) {
			_this.dropEvent(e)
		}
	})

	$(document).on('mouseup', function() {		
		if ($dropPlugin) {
			_this.mouseUpEvent()
		}
	})
}

dropPlugin.prototype.mouseDownEvent = function(e, _this) {
	dropData.offsetY = e.offsetY
	dropData.offsetX = e.offsetX
	dropData.scrollY = $(document).scrollTop()
	dropData.scrollX = $(document).scrollLeft()
	$dropPlugin = $(_this).clone(true)
	$dropPlugin.css(this.getCoordinate(e)).addClass('clone')
	$('body').append($dropPlugin)
	if (this.option.mouseDownCallback) {
		var pluginId = $(_this).attr('data-id')
		this.option.mouseDownCallback(pluginId)
	}
}

dropPlugin.prototype.dropEvent = function(e) {
	$dropPlugin.css(this.getCoordinate(e))
}

dropPlugin.prototype.mouseUpEvent = function() {
	if (this.option.mouseUpCallback) {
		var offset = $dropPlugin.offset()
		var width = $dropPlugin.outerWidth(true)
		var height = $dropPlugin.outerHeight(true)
		var pluginId = $dropPlugin.attr('data-id')
		var parentPluginId = ''
		var parentPlugin = $sourcePlugin.parents('.plugin')
		if (parentPlugin.length) {
			parentPluginId = parentPlugin.attr('data-id')
		}
		this.option.mouseUpCallback({
			parentPluginId: parentPluginId,
			pluginId: pluginId,
			left: offset.left,
			top: offset.top,
			right: offset.left + width,
			bottom: offset.top + height
		})
	}
	$sourcePlugin.removeClass('drop')
	$('.plugin.clone').remove()
	$dropPlugin = null
}

dropPlugin.prototype.getCoordinate = function(e) {
	dropData.clientY = e.clientY
	dropData.clientX = e.clientX
	return {
		top: dropData.clientY - dropData.offsetY + dropData.scrollY - 20,
		left: dropData.clientX - dropData.offsetX + dropData.scrollX
	}
}

function dropAction(option) {
	var plugin = new dropPlugin(option)
	plugin.init()
	return plugin
}

export {
	dropAction
}