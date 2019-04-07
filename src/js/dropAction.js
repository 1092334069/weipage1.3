var $dropPlugin
var dropData = {
	clientY: 0,
	clientX: 0,
	offsetY: 0,
	offsetX: 0
}

var dropPlugin = function() {

}

dropPlugin.prototype.init = function() {
	this.bindEvent()
}

dropPlugin.prototype.bindEvent = function() {
	var _this = this

	$(document).on('mousedown', '.plugin', function(e) {
		$dropPlugin = $(this).clone(true)
		var offset = $(this).offset()
		_this.mouseDownEvent(e, this)
		$dropPlugin.css({top: offset.top, left: offset.left}).addClass('clone')
		$('body').append($dropPlugin)		
	})

	$(document).on('mousemove', '.plugin', function(e) {
		if ($dropPlugin) {
			_this.dropEvent(e, this)
		}
	})

	$(document).on('mouseup', function(e) {
		console.log(dropData)
		if ($dropPlugin) {
			$('.plugin.clone').remove()
			$dropPlugin = null
		}
	})
}

dropPlugin.prototype.mouseDownEvent = function(e) {
	dropData.offsetY = e.offsetY
	dropData.offsetX = e.offsetX
}

dropPlugin.prototype.dropEvent = function(e) {
	dropData.clientY = e.clientY
	dropData.clientX = e.clientX
	var top = dropData.clientY - dropData.offsetY
	var left = dropData.clientX - dropData.offsetX
	$dropPlugin.css({top: top, left: left})
}

function dropAction() {
	var plugin = new dropPlugin()
	plugin.init()
	return plugin
}

export {
	dropAction
}