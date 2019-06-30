import 'babel-polyfill'

import '../../css/reset.css'
import '../../css/weipage/index.css'

import '../../../vueComponent'
import '../../../vueComponents'
import '../../../plugin'
import '../../vue'

import { pluginUpdate, pluginSearch, pluginMove, pluginRemove } from './formAction.js'
import { createPlugin } from '../../../plugin/pluginAction.js'
import { dropAction } from './dropAction.js'
import { interfaceAction } from './interfaceAction.js'
import { viewAction } from './viewAction.js'

var interfaceTable = [
	{title: '接口名称', key: 'name'},
	{title: '接口地址', key: 'url'},
	{title: '操作', key: 'action', render: (h, params) => {
		return h('Button', {
			on: {
				click: () => {
					interfacePlugin.selectInterface(params.row.id)
				}
			}
		}, '选取')
	}}
]

var viewPlugin = viewAction()

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			// 	微页面基础
			weipage: {
				name: '',
				describes: '',
				cover: '',
				pageName: '',
				interfaceList: [],
				selectInterfaceId: 0
			},

			// 插件编辑
			pluginList: [],
			selectPluginId: '',
			selectForm: 'base',

			// 插件树
			pluginTreeModel: false,
			pluginSelectSource: '',

			// 接口对话框
			interfaceModel: false,
			interfaceTable,
			interfaceTableData: [],
			interActionSource: '',

			// 接口树
			interfaceTreeModel: false,
			interfaceTree:[]
		}
	},
	computed: {
		editForm() {
			return pluginSearch(this, this.selectPluginId)
		}
	},
	methods: {
		weipageChange(res) {
			this.weipage[res.name] = res.value
		},
		formChange(res) {
			pluginUpdate(res, this.editForm)
		},
		selectPlugin(pluginId) {
			this.selectPluginId = pluginId
		},
		insertPlugin(pluginType) {
			const plugin = createPlugin(pluginType)
			this.selectPluginId = plugin.pluginId
			this.pluginList.push(plugin)
		},
		removePlugin(pluginId) {
			pluginRemove(this, pluginId)
		},
		changeFormTab(form) {
			this.selectForm = form
		},
		openPluginTreeModel(source) {
			this.pluginSelectSource = source
			this.pluginTreeModel = true
		},
		closePluginTreeModel() {
			this.pluginTreeModel = false
		},
		pluginTreeSelect(option) {
			if (this.pluginSelectSource === 'event') {
				pluginTreeSelectAction(option.pluginId)
			} else {
				this.selectPlugin(option.pluginId)
			}
			this.closePluginTreeModel()
		},
		openInterfaceModel(source) {
			interfacePlugin.getInterfaceList()
			this.interActionSource = source
			this.interfaceModel = true
		},
		closeInterfaceModel() {
			this.interfaceModel = false
		},
		openInterfaceTreeModel() {
			this.interfaceTreeModel = true
		},
		closeInterfaceTreeModel() {
			this.interfaceTreeModel = false
		},
		selectInterfaceParam(option) {
			this.closeInterfaceTreeModel()
			interfacePlugin.selectInterfaceParam(option)
		},
		deleteInterface(interfaceId) {
			interfacePlugin.deleteInterface(interfaceId)
		}
	}
})

var dropPlugin = dropAction({
	mouseDownCallback: (pluginId) => {
		weipage.selectPlugin(pluginId)
	},
	mouseUpCallback: (res) => {
		viewPlugin.buildList()
		var ret = viewPlugin.operationView(res)
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	}
})

var interfacePlugin = interfaceAction({
	that: weipage
})

function pluginTreeSelectAction(pluginId) {
	let selectPluginDetail
	for (let i = 0; i < weipage.pluginList.length; i++) {
		if (pluginId === weipage.pluginList[i].pluginId) {
			selectPluginDetail = weipage.pluginList[i]
		}
	}

	for (let i = 0; i < weipage.pluginList.length; i++) {
		const pluginDetail = weipage.pluginList[i]
		if (weipage.selectPluginId === pluginDetail.pluginId) {
			if (selectPluginDetail) {
				const eventOptions = []
				for (let i = 0; i < selectPluginDetail.base.actionList.length; i++){
					if (selectPluginDetail.base.actionList[i].condition === 'event') {
						eventOptions.push({
							label: selectPluginDetail.base.actionList[i].name,
							value: i
						})
					}
				}
				if (eventOptions.length) {
					pluginDetail.event.eventList[pluginDetail.event.selectIndex].value = {
						name: selectPluginDetail.base.name,
						id: pluginId,
						options: eventOptions,
						actionName: eventOptions[0].label,
						actionIndex: eventOptions[0].value
					}
				}
			}
		}
	}
}

// 进入页面登录，后面删掉代码
$.ajax({url:'/api/login/phoneCode',type:'get',data:{phone:13651438085,code:788329},dataType:'JSON',success:function(res){console.log(res)}})
