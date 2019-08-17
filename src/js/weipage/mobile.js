import 'babel-polyfill'
import '../../css/reset.css'
import '../../css/weipage/mobile.css'

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
					if (res.data.weipage.countEvent && res.data.weipage.countEvent.eventList.length) {
						const countEventList = res.data.weipage.countEvent.eventList
						for (let i = 0; i < countEventList.length; i++) {
							mobileAction.countDataList.push({
								cardinal: countEventList[i].cardinal,
								countId: countEventList[i].countId,
								initial: countEventList[i].initial,
								rule: countEventList[i].rule,
								data: countEventList[i].initial
							})
						}
					}

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
			const screenHeight = isPC() ? 667 : window.screen.height
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


function isPC() {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
