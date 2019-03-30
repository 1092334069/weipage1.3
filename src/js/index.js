import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'
import { formUpdate, searchPlugin } from './formAction.js'
import { createPlugin } from '../../plugin/pluginAction.js'

var weipage = new Vue({
	el: '#weipage',
	data: {
		pluginList: [],
		selectPluginId: 0
	},
	computed: {
		editForm() {
			return searchPlugin(this.pluginList, this.selectPluginId)
		}
	},
	methods: {
		formChange(res) {
			formUpdate(res, this.editForm)
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


$('#weipage').on('click', '.plugin', function() {
	weipage.selectPluginId = $(this).attr('data-id')
})