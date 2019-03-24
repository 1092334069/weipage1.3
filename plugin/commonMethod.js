var commonMethod = {
	parseStyle: function() {
		var width = 'width:' + this.viewData.style.shape.width + ';'
		var height = 'height:' + this.viewData.style.shape.height + ';'
		var margin = 'margin:' + this.viewData.style.shape.margin + ';'
		var padding = 'padding:' + this.viewData.style.shape.padding + ';'
		var borderRadius = 'borderRadius:' + this.parseBorderRadius() + ';'

		var backgroundColor = 'backgroundColor:' + this.viewData.style.fill.color

		return width + height + margin + padding + borderRadius + backgroundColor
	},
	parseBorderRadius: function() {
		var borderRadius = this.viewData.style.shape.borderRadius
		if (typeof borderRadius == 'number') {
			return borderRadius + 'px'
		} else {
			return borderRadius.split(' ').join('px ') + 'px'
		}
	}
}

export default commonMethod
