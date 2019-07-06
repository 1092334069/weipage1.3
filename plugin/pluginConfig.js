var pluginConfig = {
	panel: {
		pluginType: 'panel',
		base: {
			name: '面板',
			data: '',
			type: 'normal',
			actionList: [],
			selectIndex: 0
		},
		style: {
			width: 375,
			height: 50,
			margin: 0,
			padding: 0,
			borderRadius: 0,
			transformRotate: 0,
			border: 'none',
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: '#e5e5e5',
			backgroundColor: '#ffffff',
			backgroundImage: '',
			position: 'relative',
			top: 0,
			left: 0
		},
		event: {
			eventList: [],
			selectIndex: 0
		},
		pluginList: []
	},
	text: {
		pluginType: 'text',
		base: {
			name: '文本',
			data: '',
			actionList: [],
			selectIndex: 0
		},
		style: {
			fontSize: 12,
			color: '#333333',
			lineHeight: 18,
			fontWeight: 'normal',
			fontStyle: 'normal'
		}
	},
	image: {
		pluginType: 'image',
		base: {
			name: '图片',
			data: '',
			actionList: [],
			selectIndex: 0
		},
		style: {
			width: 375
		}
	}
}

export default pluginConfig
