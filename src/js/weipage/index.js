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

			// 接口对话框
			interfaceModel: false,
			interfaceTable,
			interfaceTableData: [],

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
			console.log(this.weipage)
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
		openPluginTree() {
			this.pluginTreeModel = true
		},
		closePluginTree() {
			this.pluginTreeModel = false
		},
		openInterfaceModel() {
			interfacePlugin.getInterfaceList()
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

// 进入页面登录，后面删掉代码
$.ajax({url:'/api/login/phoneCode',type:'get',data:{phone:13651438085,code:788329},dataType:'JSON',success:function(res){console.log(res)}})
