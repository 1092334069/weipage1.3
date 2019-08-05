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
		doPluginEvent(option){
			console.log(option)
			mobileAction.doPluginEvent(option.pluginId, option.indexList)
		}
	}
})

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
