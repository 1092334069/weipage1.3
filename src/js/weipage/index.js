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
			weipage: {
				name: '',
				describes: '',
				cover: '',
				pageName: '',
				interfaceList: []
			},
			pluginList: [],
			selectPluginId: '',
			selectForm: 'base',
			pluginTreeModel: false,
			interfaceModel: false,
			interfaceTable: [
				{title: '接口名称', key: 'name'},
				{title: '接口地址', key: 'url'},
				{title: '操作', key: 'action', render: (h, params) => {
					return h('Button', {}, '选取')
				}}
			],
			interfaceTableData: []
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
			this.interfaceModel = true
		},
		closeInterfaceModel() {
			this.interfaceModel = false
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

getInterfaceList()

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
