import 'babel-polyfill'

import '../../css/reset.css'
import '../../css/weipage/index.css'
import '../../css/weipage/formList.css'

import '../../../vueComponent'
import '../../../vueComponents'
import '../../../plugin'
import '../../vue'

import { pluginUpdate, pluginSearch, pluginMove, pluginRemove, eventPluginTreeSelect, weipageScrollPluginTreeSelect, formTreeSelect } from './formAction.js'
import { createPlugin } from '../../../plugin/pluginAction.js'
import { dropAction } from './dropAction.js'
import { interfaceAction } from './interfaceAction.js'
import { viewAction } from './viewAction.js'

// h回调响应
const callbackAction = {
	selectInterface: () => {},
	selectInterfaceParam: () => {},
	selectPluginTree: () => {},
	selectForm: () => {}
}

var interfaceTable = [
	{title: '接口名称', key: 'name'},
	{title: '接口地址', key: 'url'},
	{title: '操作', key: 'action', render: (h, params) => {
		return h('Button', {
			on: {
				click: () => {
					callbackAction.selectInterface(params.row.id)
				}
			}
		}, '选取')
	}}
]

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
				selectInterfaceId: 0,
				scrollEvent: {
					eventList: [],
					selectIndex: 0
				}
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
			interfaceTree:[],

			// 表单树
			formTreeModel: false
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
			this.changeFormTab('base')
			this.selectPluginId = pluginId
		},
		insertPlugin(pluginType) {
			const plugin = createPlugin(pluginType)
			if (plugin) {
				this.selectPluginId = plugin.pluginId
				this.pluginList.push(plugin)
			}
		},
		removePlugin(pluginId) {
			pluginRemove(this, pluginId)
		},
		changeFormTab(form) {
			this.selectForm = form
		},
		openPluginTreeModel(source) {
			this.pluginTreeModel = true
			if (source === 'event') {
				callbackAction.selectPluginTree = (option) => {
					eventPluginTreeSelect(this, option.pluginId)
				}
			} else if (source === 'weipageScroll') {
				callbackAction.selectPluginTree = (option) => {
					weipageScrollPluginTreeSelect(this, option.pluginId)
				}
			} else {
				callbackAction.selectPluginTree = (option) => {
					this.selectPlugin(option.pluginId)
				}
			}
		},
		closePluginTreeModel() {
			this.pluginTreeModel = false
		},
		pluginTreeSelect(option) {
			callbackAction.selectPluginTree(option)
			this.closePluginTreeModel()
		},
		openInterfaceModel(source) {
			interfaceAction.getInterfaceList()
			this.interfaceModel = true
			if (source === 'event') {
				callbackAction.selectInterface = (option) => {
					interfaceAction.eventSelectInterface(option)
				}
			} else if (source === 'weipageScroll') {
				callbackAction.selectInterface = (option) => {
					interfaceAction.weipageScrollSelectInterface(option)
				}
			} else {
				callbackAction.selectInterface = (option) => {
					interfaceAction.weipageSelectInterface(option)
				}
			}
		},
		closeInterfaceModel() {
			this.interfaceModel = false
		},
		openInterfaceTreeModel(form) {
			this.interfaceTreeModel = true
			if (form === 'baseAction') {
				callbackAction.selectInterfaceParam = (option) => {
					interfaceAction.baseActionSelectInterfaceParam(option)
				}
			} else if (form === 'baseAttr') {
				callbackAction.selectInterfaceParam = (option) => {
					interfaceAction.baseAttrSelectInterfaceParam(option)
				}
			} else {
				callbackAction.selectInterfaceParam = (option) => {
					interfaceAction.eventSelectStatusInterfaceParam(option)
				}
			}
		},
		closeInterfaceTreeModel() {
			this.interfaceTreeModel = false
		},
		selectInterfaceParam(option) {
			this.closeInterfaceTreeModel()
			callbackAction.selectInterfaceParam(option)
		},
		deleteInterface(interfaceId) {
			interfaceAction.deleteInterface(interfaceId)
		},
		openFormTreeModel(option) {
			console.log(option)
			this.formTreeModel = true
			if (option && option.source === 'event') {
				callbackAction.selectForm = (res) => {
					formTreeSelect(this, res.pluginId, option.key)
				}
			}
		},
		closeFormTreeModel() {
			this.formTreeModel = false
		},
		formTreeSelect(option) {
			this.closeFormTreeModel()
			callbackAction.selectForm(option)
		}
	}
})

dropAction.init({
	mouseDownCallback: (pluginId) => {
		weipage.selectPlugin(pluginId)
	},
	mouseUpCallback: (res) => {
		viewAction.buildList()
		const ret = viewAction.operationView(res)
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	}
})

interfaceAction.init(weipage)

// 进入页面登录，后面删掉代码
$.ajax({url:'/api/login/phoneCode',type:'get',data:{phone:13651438085,code:788329},dataType:'JSON',success:function(res){console.log(res)}})
