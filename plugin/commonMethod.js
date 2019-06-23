const commonMethod = {
	parseStyle: function() {
		let width,height,margin,padding,borderRadius,transformRotate,border,position,backgroundColor,backgroundImage
		if (this.viewData.style) {
			width = 'width:' + this.viewData.style.width + ';'
			height = 'height:' + this.viewData.style.height + ';'
			margin = 'margin:' + this.parseFourSides(this.viewData.style.margin) + ';'
			padding = 'padding:' + this.parseFourSides(this.viewData.style.padding) + ';'
			borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.borderRadius) + ';'
			transformRotate = 'transform:rotate(' + this.viewData.style.transformRotate + 'deg);'
			border = 'border:' + this.parseBorder() + ';'
			position = this.parsePosition() + ';'
			backgroundColor = 'backgroundColor:' + this.viewData.style.backgroundColor + ';'
			backgroundImage = 'backgroundImage:url(' + this.viewData.style.backgroundImage + ')'
			return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parsePanelStyle: function() {
		let width,height,margin,padding,borderRadius,transformRotate,border,position,backgroundColor,backgroundImage
		if (this.viewData.style && this.viewData.base) {
			width = 'width:' + this.viewData.style.width + ';'
			if (this.viewData.base.type === 'list') {
				height = 'height:' + (2 * this.viewData.style.height) + ';'
			} else {
				height = 'height:' + this.viewData.style.height + ';'
			}
			margin = 'margin:' + this.parseFourSides(this.viewData.style.margin) + ';'
			padding = 'padding:' + this.parseFourSides(this.viewData.style.padding) + ';'
			borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.borderRadius) + ';'
			transformRotate = 'transform:rotate(' + this.viewData.style.transformRotate + 'deg);'
			border = 'border:' + this.parseBorder() + ';'
			position = this.parsePosition()
			return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parsePanelItemStyle: function() {
		let backgroundColor,backgroundImage
		if (this.viewData.style) {
			backgroundColor = 'backgroundColor:' + this.viewData.style.backgroundColor + ';'
			backgroundImage = 'backgroundImage:url(' + this.viewData.style.backgroundImage + ')'
			return backgroundColor + backgroundImage
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
		if (this.viewData.style.border === 'block') {
			return this.viewData.style.borderWidth + 'px ' + this.viewData.style.borderStyle + ' ' + this.viewData.style.borderColor
		} else {
			return 'none'
		}
	},
	parsePosition: function() {
		if (this.viewData.style.position === 'relative') {
			return 'position:relative'
		} else {
			return 'position:absolute;top:' + this.viewData.style.top + ';left:' + this.viewData.style.left
		}
	}
 }

export default commonMethod
