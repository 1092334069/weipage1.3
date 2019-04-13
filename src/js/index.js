import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'
import { pluginUpdate, searchPlugin, pluginMove } from './formAction.js'
import { createPlugin } from '../../plugin/pluginAction.js'
import { dropAction } from './dropAction.js'
import { viewAction } from './viewAction.js'

var viewPlugin = viewAction()

var weipage = new Vue({
	el: '#weipage',
	data: {
		pluginList: [],
		selectPluginId: 0
	},
	computed: {
		editForm() {
			return searchPlugin(this, this.selectPluginId)
		}
	},
	methods: {
		formChange(res) {
			pluginUpdate(res, this.editForm)
		},
		insertPlugin() {
			var plugin = createPlugin('panel')
			this.selectPluginId = plugin.pluginId
			this.pluginList.push(plugin)
		}
	},
	created:function(){
		
	}
})


var dropPlugin = dropAction({
	callback: function(res) {
		viewPlugin.buildList()
		var ret = viewPlugin.operationView(res)
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	}
})

$(document).on('click', '.plugin', function() {
	weipage.selectPluginId = $(this).attr('data-id')
})
