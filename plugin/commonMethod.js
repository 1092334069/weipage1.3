var commonMethod = {
	parseStyle: function() {
		var width,height,margin,padding,borderRadius,transformRotate,border,position,backgroundColor,backgroundImage
		if (this.viewData.style) {
			if (this.viewData.style.shape) {
				width = 'width:' + this.viewData.style.shape.width + ';'
				height = 'height:' + this.viewData.style.shape.height + ';'
				margin = 'margin:' + this.parseFourSides(this.viewData.style.shape.margin) + ';'
				padding = 'padding:' + this.parseFourSides(this.viewData.style.shape.padding) + ';'
				borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.shape.borderRadius) + ';'
				transformRotate = 'transform:rotate(' + this.viewData.style.shape.transformRotate + 'deg);'
			}
			if (this.viewData.style.border) {
				border = 'border:' + this.parseBorder() + ';'
			}
			if (this.viewData.style.location) {
				position = this.parsePosition() + ';'
			}
			if (this.viewData.style.fill) {
				backgroundColor = 'backgroundColor:' + this.viewData.style.fill.color + ';'
				backgroundImage = 'backgroundImage:url(' + this.viewData.style.fill.image + ')'
			}
			return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
		} else {
			return ''
		}
		
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
