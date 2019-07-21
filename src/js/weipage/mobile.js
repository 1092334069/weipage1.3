import 'babel-polyfill'
import '../../css/reset.css'

import '../../../plugin/view.js'

import { commonAction } from '../commonAction.js'
import { weipageAction } from './weipageAction.js'

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
				}
			})
		}
	}
})

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
