<template>
	<div class="plugin-form">
		<div class="form-list">
			<div class="form-lable">事件列表：</div>
			<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.scrollEvent.eventList" @click="selectEvent(index)">{{index+1}}</div>
			<div class="add-module" @click="addEvent"></div>
		</div>
		<div class="sub-form-list" v-if="formData.scrollEvent.eventList && formData.scrollEvent.eventList.length">
			<hr/>
			<template v-for="(item,index) in formData.scrollEvent.eventList" v-if="formData.scrollEvent.selectIndex === index">
				<div class="delete-module" @click="deleteEvent"></div>
				<div class="form">
					<v-radio lable="方向" :options="directionOptions" :value="item.direction" name="direction" @formChange="eventChange"></v-radio>
				</div>
				<div class="form">
					<v-radio lable="类型" :options="eventTypeOptions" :value="item.type" name="type" @formChange="eventTypeChange"></v-radio>
				</div>
				<template v-if="item.type === 'normal'">
					<div class="form-list">
						<span class="form-lable">元件：</span>
						<div class="form-item" @click="openPluginTreeModel">{{item.value.name}}</div>
					</div>
					<template v-if="item.value.options && item.value.options.length">
						<div class="form">
							<v-select lable="响应" :options="item.value.options" :value="item.value.actionIndex" @formChange="normalEventChange"></v-select>
						</div>
					</template>
				</template>
				<template v-else>
					<div class="form-list">
						<span class="form-lable">接口：</span>
						<div class="form-item" @click="openInterfaceModel">{{item.value.name}}</div>
					</div>
					<template v-if="item.value.param && item.value.param.length">
						<div class="form size-l" v-for="inf in item.value.param">
							<v-input-source :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" @formChange="interfaceChange" @sourceChange="interfaceChange"></v-input-source>
						</div>
					</template>
				</template>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: "weipageScrollForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
		    return {
				eventTypeOptions: [{
					label: '接口事件',
					value: 'interface'
				},{
					label: '本地事件',
					value: 'normal'
				}],
				directionOptions: [{
					label: '向下',
					value: 'bottom'
				},{
					label: '向上',
					value: 'top'
				}],
				sourceOptions: [{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'sessionStorage'
				},{
					label: '表单',
					value: 'form'
				}]
			}
		},
		methods: {
			weipageChange: function(res) {
				const scrollEvent = this.formData.scrollEvent
				scrollEvent[res.name] = res.value
				this.$emit('weipage-change', {
					name: 'scrollEvent',
					value: scrollEvent
				})
			},
			parseClass: function(index) {
				if (index === this.formData.scrollEvent.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectEvent: function(index) {
				this.weipageChange({
					name: 'selectIndex',
					value: index
				})
			},
			addEvent: function() {
				const eventList = this.formData.scrollEvent.eventList
				eventList.push({
					type: 'interface',
					direction: 'bottom',
					key: '',
					value: {
						name: '点击选择接口'
					}
				})
				this.weipageChange({
					name: 'eventList',
					value: eventList
				})
				this.weipageChange({
					name: 'selectIndex',
					value: eventList.length - 1
				})
			},
			deleteEvent: function() {
				const eventList = this.formData.scrollEvent.eventList
				eventList.splice(this.formData.scrollEvent.selectIndex, 1)
				this.weipageChange({
					name: 'selectIndex',
					value: 0
				})
				this.weipageChange({
					name: 'eventList',
					value: eventList
				})
			},
			eventChange: function(res) {
				const eventList = this.formData.scrollEvent.eventList
				eventList[this.formData.scrollEvent.selectIndex][res.name] = res.value
				this.weipageChange({
					name: 'eventList',
					value: eventList
				})
			},
			eventTypeChange: function(res) {
				if (res.value === 'interface') {
					this.formData.scrollEvent.eventList[this.formData.scrollEvent.selectIndex]['value'] = {
						name: '点击选择接口'
					}
				} else if (res.value === 'normal') {
					this.formData.scrollEvent.eventList[this.formData.scrollEvent.selectIndex]['value'] = {
						name: '点击选择元件',
						id: '',
						options: [],
						actionName: '',
						actionId: ''
					}
				} else {
					this.formData.scrollEvent.eventList[this.formData.scrollEvent.selectIndex]['value'] = ''
				}
				this.eventChange(res)
			},
			normalEventChange: function(res) {
				const v = this.formData.scrollEvent.eventList[this.formData.scrollEvent.selectIndex]['value']
				let actionName = ''
				for (var i = 0; i < v.options.length; i++) {
					if (v.options.value === res.value) {
						actionName = v.options.label
					}
				}
				v['actionIndex'] = res.value
				v['actionName'] = actionName
				const r = {
					name: 'value',
					value: v
				}
				this.eventChange(r)
			},
			interfaceChange: function(res) {
				const interfaceInfo = this.formData.scrollEvent.eventList[this.formData.scrollEvent.selectIndex]['value']
				for (let i = 0; i < interfaceInfo.param.length; i++) {
					if (interfaceInfo.param[i].key === res.name) {
						interfaceInfo.param[i].value = res.value
					}
				}
				const r = {
					name: 'value',
					value: interfaceInfo
				}
				this.eventChange(r)
			},
			openPluginTreeModel: function() {
				this.$emit('open-plugin-tree-model', 'weipageScroll')
			},
			openInterfaceModel: function() {
				this.$emit('open-interface-model', 'weipageScroll')
			}
		}
	}
</script>


<style scoped>

</style>