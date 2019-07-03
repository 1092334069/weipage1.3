class ViewAction {
	constructor() {
		this.coordinateList = []
	}
	buildList() {
		const coordinateList = []
		const $pluginList = $('#weipage').find('.plugin')
		for (let i = 0; i < $pluginList.length; i++) {
			const $plugin = $pluginList.eq(i)
			const width = $plugin.outerWidth(true)
			const height = $plugin.outerHeight(true)
			const top = $plugin.offset().top
			const left = $plugin.offset().left
			const parentPlugin = $plugin.parents('.plugin')
			let parentPluginId = ''
			if (parentPlugin.length) {
				parentPluginId = parentPlugin.attr('data-id')
			}
			coordinateList.push({
				pluginId: $plugin.attr('data-id'),
				parentPluginId,
				top,
				left,
				right: left + width,
				bottom: top + height
			})
		}
		this.coordinateList = coordinateList
	}
	operationView(coordinate) {
		for (let i = this.coordinateList.length - 1; i >= 0; i--) {
			if (this.coordinateList[i].top <= coordinate.top && this.coordinateList[i].left <= coordinate.left && this.coordinateList[i].bottom >= coordinate.bottom && this.coordinateList[i].right >= coordinate.right) {
				return {
					type: 'inside',
					toPluginId: this.coordinateList[i].pluginId,
					pluginId: coordinate.pluginId
				}
			}
		}
		for (let i = 0; i < this.coordinateList.length; i++) {
			if (this.coordinateList[i].parentPluginId === coordinate.parentPluginId && this.coordinateList[i].bottom > coordinate.bottom) {
				return {
					type: 'before',
					toPluginId: this.coordinateList[i].pluginId,
					pluginId: coordinate.pluginId
				}
			}
		}
		return {
			type: 'after',
			pluginId: coordinate.pluginId
		}
	}
}

const viewAction = new ViewAction()

export {
	viewAction
}