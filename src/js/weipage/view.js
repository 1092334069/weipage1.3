import 'babel-polyfill'
import '../../css/reset.css'
import '../../css/weipage/view.css'

import { commonAction } from '../commonAction.js'

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	$('#weipageView').attr('src', `/weipage/mobile?weipageId=${weipageId}`)
}
