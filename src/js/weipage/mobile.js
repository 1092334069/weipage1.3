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
					mobileAction.doInterfaceListAction(0, res.data.weipage.interfaceList, [], () => {
						mobileAction.doLoadingAction()
						this.loadingEnd()
						this.scrollEvent(res.data.weipage)
					})
				}
			})
		},
		doPluginEvent(option){
			mobileAction.doPluginEvent(option.pluginId, option.indexList)
		},
		loadingEnd() {
			setTimeout(() => {
				new Swiper('.swiper-container', {
					autoplay: 5000
				})
			}, 1000)
		},
		scrollEvent(weipageData) {
			const screenHeight = window.screen.height
			$(window).scroll(() => {
				const scrollTop = $(window).scrollTop()
				const height = $(window).height()
				if (scrollTop <= 0) {
					mobileAction.doScrollEvent('top', weipageData.scrollEvent.eventList, () => {
						mobileAction.doLoadingAction()
					})
				} else if (scrollTop >= height - screenHeight) {
					mobileAction.doScrollEvent('bottom', weipageData.scrollEvent.eventList, () => {
						mobileAction.doLoadingAction()
					})
				}
			})
		}
	}
})

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
