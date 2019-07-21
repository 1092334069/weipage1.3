import 'babel-polyfill'
import '../../css/reset.css'
import '../../css/table.css'

import { weipageAction } from './weipageAction.js'

var weipageList = new Vue({
	el: '#weipageList',
	data() {
		return {
			list: [],

			total: 0,
			page: 1,

			weipageTable: [
				{ title: '名称', key: 'name' , render: (h, params) => {
					return h('a', {
						attrs: {
							href: `/weipage/view?weipageId=${params.row.id}`
						}
					}, params.row.name)
				}},
				{ title: '封面', key: 'cover' , render: (h, params) => {
					return h('img', {
						attrs: {
							src: params.row.cover
						}
					})
				}},
				{ title: '操作', key: 'action', render: (h, params) => {
					return h('div',[
						h('Button', {
							on: {
								click: () => {
									window.location.href = `/weipage/index?weipageId=${params.row.id}`
								}
							}
						}, '编辑'),
						h('Button', {
							on: {
								click: () => {
									window.location.href = `/weipage/view?weipageId=${params.row.id}`
								}
							}
						}, '预览'),
						h('Button', {
							on: {
								click: () => {
									this.deleteWeipage(params.row.id)
								}
							}
						}, '删除')
					])
				}}
			]
		}
	},
	methods: {
		getWeipageList() {
			weipageAction.getWeipageList({
				page: this.page,
				size: 10
			}, (res) => {
				this.list = res.list
				this.total = res.total
			})
		},
		pageChange(option) {
			this.page = option
			this.getWeipageList()
		},
		insertWeipage() {
			window.location.href = '/weipage/index'
		},
		deleteWeipage(weipageId) {
			weipageAction.deleteWeipage({
				weipageId
			}, (res) => {
				this.$Message.success('删除成功')
				this.getWeipageList()
			}, (msg) => {
				if (msg) {
					this.$Message.error(msg)
				} else {
					this.$Message.error('删除失败，请稍后重试')
				}
			})
		}
	}
})

weipageList.getWeipageList()
