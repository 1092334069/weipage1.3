var commonMethod = {
	parseStyle: function() {
		var width = 'width:' + this.viewData.style.shape.width + ';'
		var height = 'height:' + this.viewData.style.shape.height + ';'
		var margin = 'margin:' + this.parseFourSides(this.viewData.style.shape.margin) + ';'
		var padding = 'padding:' + this.parseFourSides(this.viewData.style.shape.padding) + ';'
		var borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.shape.borderRadius) + ';'
		var transformRotate = 'transform:rotate(' + this.viewData.style.shape.transformRotate + 'deg);'
		var border = 'border:' + this.parseBorder() + ';'
		var position = this.parsePosition() + ';'
		var backgroundColor = 'backgroundColor:' + this.viewData.style.fill.color + ';'
		var backgroundImage = 'backgroundImage:url(' + this.viewData.style.fill.image + ')'

		return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
	},
	parseClass: function() {
		if (this.selectPluginId === this.viewData.pluginId) {
			return 'current'
		} else{
			return ''
		}
	},
	parseFourSides: function(value) {
		if (typeof value == 'number') {
			return value + 'px'
		} else if (typeof value === 'object' && value instanceof Array) {
			return value.join('px ') + 'px'
		} else {
			return 0
		}
	},
	parseBorder: function() {
		if (this.viewData.style.border.display === 'block') {
			return this.viewData.style.border.width + 'px ' + this.viewData.style.border.style + ' ' + this.viewData.style.border.color
		} else {
			return 'none'
		}
	},
	parsePosition: function() {
		if (this.viewData.style.location.position === 'relative') {
			return 'position:relative'
		} else {
			return 'position:absolute;top:' + this.viewData.style.location.top + ';left:' + this.viewData.style.location.left
		}
	}
 }

export default commonMethod
