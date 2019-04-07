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
	$dropPlugin = $(_this).clone(true)
	var offset = $(_this).offset()
	$dropPlugin.css({top: offset.top, left: offset.left}).addClass('clone')
	$('body').append($dropPlugin)
}

dropPlugin.prototype.dropEvent = function(e) {
	dropData.clientY = e.clientY
	dropData.clientX = e.clientX
	var top = dropData.clientY - dropData.offsetY
	var left = dropData.clientX - dropData.offsetX
	$dropPlugin.css({top: top, left: left})
}

dropPlugin.prototype.mouseUpEvent = function() {
	if (this.option.callback) {
		var offset = $dropPlugin.offset()
		var width = $dropPlugin.outerWidth(true)
		var height = $dropPlugin.outerHeight(true)
		var pluginId = $dropPlugin.attr('data-id')
		this.option.callback({
			pluginId: pluginId,
			left: offset.left,
			top: offset.top,
			right: offset.left + width,
			bottom: offset.top + height
		})
	}
	$('.plugin.clone').remove()
	$dropPlugin = null
}

function dropAction(option) {
	var plugin = new dropPlugin(option)
	plugin.init()
	return plugin
}

export {
	dropAction
}