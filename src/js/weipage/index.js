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
import { viewAction } from './viewAction.js'

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
			interfaceTable: [
				{title: '接口名称', key: 'name'},
				{title: '接口地址', key: 'url'},
				{title: '操作', key: 'action', render: (h, params) => {
					return h('Button', {
						on: {
							click: () => {
								this.selectInterface(params.row.id)
							}
						}
					}, '选取')
				}}
			],
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
		},
		formChange(res) {
			pluginUpdate(res, this.editForm)
		},
		selectPlugin(pluginId) {
			this.selectPluginId = pluginId
		},
		insertPlugin(pluginType) {
			var plugin = createPlugin(pluginType)
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
			getInterfaceList()
			this.interfaceModel = true
		},
		closeInterfaceModel() {
			this.interfaceModel = false
		},
		selectInterface(interfaceId) {
			this.closeInterfaceModel()
			getInterfaceDetail(interfaceId, (res) => {
				const param = JSON.parse(res.param)
				const paramList = []
				for (let i = 0; i < param.length; i++) {
					let p = param[i]
					if (param[i].type === 'number') {
						p['value'] = 0
					} else {
						p['value'] = ''
					}
					paramList.push(p)
				}
				const interfaceDetail = {
					interfaceId: res.interfaceId,
					name: res.name,
					url: res.url,
					type: res.type,
					dataType: res.dataType,
					callbackParam: JSON.parse(res.callbackParam),
					param: paramList
				}
				this.weipage.interfaceList.push(interfaceDetail)
				this.weipage.selectInterfaceId = res.interfaceId
				this.interfaceTree.push(interfaceDetail)
			})
		},
		openInterfaceTreeModel() {
			this.interfaceTreeModel = true
		},
		closeInterfaceTreeModel() {
			this.interfaceTreeModel = false
		},
		selectInterfaceParam(name) {
			this.closeInterfaceTreeModel()
			for (let i = 0; i < this.pluginList.length; i++) {
				if (this.selectPluginId === this.pluginList[i].pluginId) {
					this.pluginList[i].base.actionList[this.pluginList[i].base.selectActionIndex].value = name
				}
			}
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

// 获取接口列表
function getInterfaceList() {
	$.ajax({
		url: '/api/interface/getPageList',
		type: 'get',
		data: {
			page: 1,
			size: 10
		},
		dataType: 'json',
		success: (res) => {
			if (res && res.code === 200 && res.data) {
				weipage.interfaceTableData = res.data.list
			}
		}
	})
}

function getInterfaceDetail(interfaceId, callback) {
	$.ajax({
		url: '/api/interface/detail',
		type: 'get',
		data: {
			interfaceId: interfaceId
		},
		dataType: 'json',
		success: (res) => {
			if (res && res.code === 200 && res.data) {
				callback(res.data)
			}
		}
	})
}
