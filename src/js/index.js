import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'
import { createPlugin } from '../../plugin/pluginAction.js'

new Vue({
	el: '#weipage',
	data: {
		pluginList: [],
		selectPluginId: 0
	},
	computed: {
		editForm() {
			if (this.pluginList.length) {
				var editForm = {}
				for (var i = 0; i < this.pluginList.length; i++) {
					if (this.selectPluginId === this.pluginList[i].pluginId) {
						editForm = this.pluginList[i]
					}
				}
				return editForm
			} else {
				return false
			}
		}
	},
	methods: {
		formChange(res) {
			var keyList = this.parseKeyList(res.pname, res.name)
			this.formChangeAction(0, keyList, this.editForm, res.value)
		},
		parseKeyList(pname, name, value) {
			var keyList = []
			if (pname) {
				keyList.push(pname)
			}
			if (name) {
				var nameList = name.split('.')
				for (var i = 0; i < nameList.length; i++) {
					keyList.push(nameList[i])
				}
			}
			return keyList
		},
		formChangeAction(count, keyList, obj, value) {
			if (count > 10000) {
				return
			}
			if (!keyList.length) {
				return
			}
			count ++
			var key = keyList.splice(0, 1)
			if (obj.hasOwnProperty(key)) {
				if (keyList.length) {
					return this.formChangeAction(count, keyList, obj[key], value)
				} else {
					obj[key] = value
				}
			}
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
