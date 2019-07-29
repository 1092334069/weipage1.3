let $sourcePlugin = $('body')
let $dropPlugin
const dropData = {
	clientY: 0,
	clientX: 0,
	offsetY: 0,
	offsetX: 0
}

class DropAction {
	constructor() {
		this.option = {}
	}
	init(option) {
		if (option) {
			this.option = option
		}
		this.bindEvent()
	}
	bindEvent() {
		const _this = this

		$(document).on('click', '.plugin', function(e) {
			if (_this.option.mouseDownCallback) {
				const pluginId = $(this).attr('data-id')
				_this.option.mouseDownCallback(pluginId)
			}
			e.preventDefault()
			e.stopPropagation()
		})

		$(document).on('mousedown', '.plugin .drop-icon', function(e) {
			$sourcePlugin = $(this).closest('.plugin')
			$(this).closest('.plugin').addClass('drop')
			_this.mouseDownEvent(e, $(this).closest('.plugin'))
			e.preventDefault()
			e.stopPropagation()
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
	mouseDownEvent(e, _this) {
		dropData.offsetY = 7
		dropData.offsetX = $(_this).width() - 7
		dropData.scrollY = $(document).scrollTop()
		dropData.scrollX = $(document).scrollLeft()
		$dropPlugin = $(_this).clone(true)
		$dropPlugin.css(this.getCoordinate(e)).addClass('clone')
		$('body').append($dropPlugin)
	}
	dropEvent(e) {
		$dropPlugin.css(this.getCoordinate(e))
	}
	mouseUpEvent() {
		if (this.option.mouseUpCallback) {
			const offset = $dropPlugin.offset()
			const width = $dropPlugin.outerWidth(true)
			const height = $dropPlugin.outerHeight(true)
			const pluginId = $dropPlugin.attr('data-id')
			const parentPlugin = $sourcePlugin.parents('.plugin')
			let parentPluginId = ''
			if (parentPlugin.length) {
				parentPluginId = parentPlugin.attr('data-id')
			}
			this.option.mouseUpCallback({
				parentPluginId,
				pluginId,
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
	getCoordinate(e) {
		dropData.clientY = e.clientY
		dropData.clientX = e.clientX
		return {
			top: dropData.clientY - dropData.offsetY + dropData.scrollY,
			left: dropData.clientX - dropData.offsetX + dropData.scrollX
		}
	}
}

const dropAction = new DropAction()

export {
	dropAction
}