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
					mobileAction.doInterfaceList(res.data.weipage.interfaceList, () => {
						this.doLoadingAction()
					})
				}
			})
		},
		doLoadingAction() {
			for (let i = 0; i < mobileAction.actionDataList.length; i++) {
				const actionItem = mobileAction.actionDataList[i]
				if (actionItem.action && actionItem.action.condition === 'loading') {
					const actionData = mobileAction.parseActionDataValue(actionItem.action.type, actionItem.action.value)
					const actionKeyList = actionItem.action.key.split('.')
					if (actionKeyList && actionKeyList.length > 1) {
						if (actionKeyList[0] === 'base') {
							actionItem.plugin.base[actionKeyList[1]] = actionData
						} else if (actionKeyList[0] === 'style') {
							actionItem.plugin.style[actionKeyList[1]] = actionData
						}
					}
				}
			}
		}
	}
})

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
