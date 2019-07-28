const styleView = {
	parseFormStyle: function() {
		let width,height,fontSize,color,backgroundColor,backgroundImage
		if (this.viewData.style) {
			if (this.viewData.style.display === 'none') {
				return 'display:none'
			}
			width = 'width:' + this.viewData.style.width + ';'
			height = 'height:' + this.viewData.style.height + ";"
			fontSize = 'fontSize:' + this.viewData.style.fontSize + ';'
			color = 'color:' + this.viewData.style.color + ';'
			backgroundColor = 'backgroundColor:' + this.viewData.style.backgroundColor + ';'
			backgroundImage = 'backgroundImage:url(' + this.viewData.style.backgroundImage + ')'
			return width + height + fontSize + color + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parseImageStyle: function() {
		let width
		if (this.viewData.style) {
			width = 'width:' + this.viewData.style.width
			return width
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
	parseMobilePanel: function() {
		let width,height,margin,padding,borderRadius,transformRotate,border,position,backgroundColor,backgroundImage
		if (this.viewData.style && this.viewData.base) {
			width = 'width:' + this.viewData.style.width + ';'
			height = 'height:' + this.viewData.style.height + ';'
			margin = 'margin:' + this.parseFourSides(this.viewData.style.margin) + ';'
			padding = 'padding:' + this.parseFourSides(this.viewData.style.padding) + ';'
			borderRadius = 'borderRadius:' + this.parseFourSides(this.viewData.style.borderRadius) + ';'
			transformRotate = 'transform:rotate(' + this.viewData.style.transformRotate + 'deg);'
			border = 'border:' + this.parseBorder() + ';'
			position = this.parsePosition() + ";"
			backgroundColor = 'backgroundColor:' + this.viewData.style.backgroundColor + ';'
			backgroundImage = 'backgroundImage:url(' + this.viewData.style.backgroundImage + ')'
			return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parseTextStyle: function() {
		let fontSize,color,lineHeight,fontWeight,fontStyle
		if (this.viewData.style) {
			fontSize = 'fontSize:' + this.viewData.style.fontSize + ';'
			color = 'color:' + this.viewData.style.color + ';'
			lineHeight = 'lineHeight:' + this.viewData.style.lineHeight + 'px;'
			fontWeight = 'fontWeight:' + this.viewData.style.fontWeight + ';'
			fontStyle = 'fontStyle:' + this.viewData.style.fontStyle
			return fontSize + color + lineHeight + fontWeight + fontStyle
		} else {
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

export default styleView
