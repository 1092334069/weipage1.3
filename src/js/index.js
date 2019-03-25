import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'
import { formUpdate, searchForm } from './formAction.js'
import { createPlugin } from '../../plugin/pluginAction.js'

new Vue({
	el: '#weipage',
	data: {
		pluginList: [],
		selectPluginId: 0
	},
	computed: {
		editForm() {
			return searchForm(this.pluginList, this.selectPluginId)
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
