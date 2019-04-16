var pluginConfig = {
	panel: {
		pluginType: 'panel',
		base: {
			name: '面板'
		},
		style: {
			shape: {
				width: 375,
				height: 50,
				margin: 0,
				padding: 0,
				borderRadius: 0,
				transformRotate: 0
			},
			border: {
				display: 'none',
				width: 1,
				style: 'solid',
				color: '#e5e5e5'
			},
			fill: {
				color: '#ffffff',
				image: ''
			},
			location: {
				position: 'relative',
				top: 0,
				left: 0
			}
		},
		pluginList: []
	},
	text: {
		pluginType: 'text',
		base: {
			name: '文本'
		}
	},
	image: {
		pluginType: 'image',
		base: {
			name: '图片'
		}
	}
}

export default pluginConfig
