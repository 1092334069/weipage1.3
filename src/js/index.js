import 'babel-polyfill'

import '../css/reset.css'
import '../css/index.css'
import '../../vueComponent'
import '../../vueComponents'
import '../../plugin'

new Vue({
	el: '#weipage',
	data: {
		editForm: {
			style: {
				shape: {
					width: {
						value: 100,
						quantifier: 'vw'
					},
					height: {
						value: 50,
						quantifier: 'px'
					},
					margin: 20,
					padding: '10 20 10 20',
					borderRadius: 8,
					transformRotate: 90
				},
				border: {
					display: 'block',
					width: 2,
					style: 'dashed',
					color: '#ccc'
				},
				fill: {
					color: '#138ed4',
					image: 'http://shop.bizban.cn/src/assets/images/project/homePage/ic_comm.png'
				},
				location: {
					position: 'relative',
					top: 0,
					left: 0
				}
			}
		}
	},
	methods: {
		formChange: function(res) {
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
		formChangeAction: function(count, keyList, obj, value) {
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
		}
	},
	created:function(){
		
	}
})
