var commonMethod = {
	parseStyle: function() {
		var width = 'width:' + this.viewData.style.shape.width + ';'
		var height = 'height:' + this.viewData.style.shape.height + ';'
		var margin = 'margin:' + this.parseFourSides(this.viewData.style.shape.margin) + ';'
		var padding = 'padding:' + this.parseFourSides(this.viewData.style.shape.padding) + ';'
		var borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.shape.borderRadius) + ';'

		var backgroundColor = 'backgroundColor:' + this.viewData.style.fill.color

		return width + height + margin + padding + borderRadius + backgroundColor
	},
	parseFourSides: function(value) {
		if (typeof value == 'number') {
			return value + 'px'
		} else if (typeof value === 'object' && value instanceof Array) {
			return value.join('px ') + 'px'
		} else {
			return 0
		}
	}
}

export default commonMethod
