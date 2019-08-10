const styleView = {
	parseFormStyle: function() {
		let width,height,fontSize,color,backgroundColor,backgroundImage
		const viewStyle = this.getViewStyleData()
		if (viewStyle) {
			if (this.getViewStyleData('display') === 'none') {
				return 'display:none'
			}
			width = 'width:' + this.getViewStyleData('width') + ';'
			height = 'height:' + this.getViewStyleData('height') + ";"
			fontSize = 'fontSize:' + this.getViewStyleData('fontSize') + ';'
			color = 'color:' + this.getViewStyleData('color') + ';'
			backgroundColor = 'backgroundColor:' + this.getViewStyleData('backgroundColor') + ';'
			backgroundImage = 'backgroundImage:url(' + this.getViewStyleData('backgroundImage') + ')'
			return width + height + fontSize + color + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parseImageStyle: function() {
		let width
		const viewStyle = this.getViewStyleData()
		if (viewStyle) {
			width = 'width:' + this.getViewStyleData('width')
			return width
		} else {
			return ''
		}
	},
	parsePanelStyle: function() {
		let width,height,margin,padding,borderRadius,transformRotate,border,position,backgroundColor,backgroundImage
		const viewStyle = this.getViewStyleData()
		if (viewStyle) {
			if (this.getViewStyleData('display') === 'none') {
				return 'display:none'
			}
			if (this.viewData.base.type === 'slider' || this.viewData.base.type === 'waterfall') {
				width = ''
			} else {
				width = 'width:' + this.getViewStyleData('width') + ';'
			}
			if (this.viewData.base.type === 'waterfall') {
				height = ''
			} else {
				height = 'height:' + this.getViewStyleData('height') + ';'
			}
			margin = 'margin:' + this.parseFourSides(this.getViewStyleData('margin')) + ';'
			padding = 'padding:' + this.parseFourSides(this.getViewStyleData('padding')) + ';'
			borderRadius = 'borderRadius:' + this.parseFourSides(this.getViewStyleData('borderRadius')) + ';'
			transformRotate = 'transform:rotate(' + this.getViewStyleData('transformRotate') + 'deg);'
			border = 'border:' + this.parseBorder() + ';'
			position = this.parsePosition() + ";"
			backgroundColor = 'backgroundColor:' + this.getViewStyleData('backgroundColor') + ';'
			backgroundImage = 'backgroundImage:url(' + this.getViewStyleData('backgroundImage') + ')'
			return width + height + margin + padding + borderRadius + transformRotate + border + position + backgroundColor + backgroundImage
		} else {
			return ''
		}
	},
	parseTextStyle: function() {
		let fontSize,color,lineHeight,fontWeight,fontStyle
		const viewStyle = this.getViewStyleData()
		if (viewStyle) {
			fontSize = 'fontSize:' + this.getViewStyleData('fontSize') + ';'
			color = 'color:' + this.getViewStyleData('color') + ';'
			lineHeight = 'lineHeight:' + this.getViewStyleData('lineHeight') + 'px;'
			fontWeight = 'fontWeight:' + this.getViewStyleData('fontWeight') + ';'
			fontStyle = 'fontStyle:' + this.getViewStyleData('fontStyle')
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
		if (this.getViewStyleData('border') === 'block') {
			return this.getViewStyleData('borderWidth') + 'px ' + this.getViewStyleData('borderStyle') + ' ' + this.getViewStyleData('borderColor')
		} else {
			return 'none'
		}
	},
	parsePosition: function() {
		if (this.getViewStyleData('position') === 'relative') {
			return 'position:relative'
		} else {
			return 'position:absolute;top:' + this.getViewStyleData('top') + ';left:' + this.getViewStyleData('left')
		}
	},
	parseViewDataIndexList: function(index) {
		const list = JSON.parse(JSON.stringify(this.viewDataIndexList))
		list.push(index)
		return list
	},
	parseIndexList: function(index) {
		const list = JSON.parse(JSON.stringify(this.indexList))
		list.push(index)
		return list
	},
	parseBaseData: function() {
		if (this.viewDataIndexList && this.viewDataIndexList.length && this.viewData.base) {
			let v = JSON.parse(JSON.stringify(this.viewData.base.data))
			for (let i = 0; i < this.viewDataIndexList.length; i++) {
				if (v && Array.isArray(v)) {
					v = v[this.viewDataIndexList[i]]
				}
			}
			return v
		} else {
			return this.viewData.base.data
		}
	},
	getViewStyleData: function(key) {
		if (this.viewDataIndexList && this.viewDataIndexList.length && this.viewData.style) {
			let v = JSON.parse(JSON.stringify(this.viewData.style))
			if (key) {
				v = v[key]
			}
			for (let i = 0; i < this.viewDataIndexList.length; i++) {
				if (v && Array.isArray(v)) {
					v = v[this.viewDataIndexList[i]]
				}
			}
			return v
		} else {
			if (key) {
				return this.viewData.style[key]
			} else {
				return this.viewData.style
			}
		}
	},
	parseEventOption: function(index) {
		const option = {
			pluginId: this.viewData.pluginId,
			indexList: JSON.parse(JSON.stringify(this.indexList))
		}
		if (index >= 0) {
			option.indexList.push(index)
		}
		return option
	},
	doEvent: function(option) {
		this.$emit('do-event', {
			pluginId: option.pluginId,
			indexList: option.indexList
		})
	}
 }

export default styleView
