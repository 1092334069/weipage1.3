import 'babel-polyfill'
import '../../css/reset.css'

import '../../../plugin/view.js'

import { commonAction } from '../commonAction.js'
import { weipageAction } from './weipageAction.js'
import { mobileAction } from './mobileAction.js'

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			pluginList: []
		}
	},
	methods: {
		getWeipageDetail(weipageId) {
			weipageAction.getWeipageDetail({
				weipageId
			}, (res) => {
				if (res.data) {
					this.pluginList = res.data.pluginList
					mobileAction.parseConfigurationDataList(0, this.pluginList)
					mobileAction.doInterfaceListAction(0, res.data.weipage.interfaceList, () => {
						mobileAction.doLoadingAction()
					})
				}
			})
		},
		doPluginEvent(pluginId){
			mobileAction.doPluginEvent(pluginId)
		},
		doEventAction(actionId) {

		}
	}
})

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
