import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'
import '../vue'
import { pluginUpdate, pluginSearch, pluginMove, pluginRemove } from './formAction.js'
import { createPlugin } from '../../plugin/pluginAction.js'
import { dropAction } from './dropAction.js'
import { viewAction } from './viewAction.js'

var viewPlugin = viewAction()

var weipage = new Vue({
	el: '#weipage',
	data: {
		pluginList: [],
		selectPluginId: '',
		selectForm: 'base',
		pluginTreeIsOpen: false
	},
	computed: {
		editForm() {
			return pluginSearch(this, this.selectPluginId)
		}
	},
	methods: {
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
			this.pluginTreeIsOpen = true
		},
		closePluginTree() {
			this.pluginTreeIsOpen = false
		}
	},
	created:function(){
		
	}
})


var dropPlugin = dropAction({
	mouseDownCallback: function(pluginId) {
		weipage.selectPlugin(pluginId)
	},
	mouseUpCallback: function(res) {
		viewPlugin.buildList()
		var ret = viewPlugin.operationView(res)
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	}
})
