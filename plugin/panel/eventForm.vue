<template>
	<div class="plugin-form">
		<div class="form-list">
			<div class="form-lable">事件列表：</div>
			<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.eventList" @click="selectEvent(index)">{{index+1}}</div>
			<div class="add-module" @click="addEvent"></div>
		</div>
		<div class="sub-form-list" v-if="formData.eventList && formData.eventList.length">
			<hr/>
			<template v-for="(item,index) in formData.eventList" v-if="formData.selectIndex === index">
				<div class="delete-module" @click="deleteEvent"></div>
				<div class="form">
					<v-radio lable="类型" :options="eventTypeOptions" :value="item.type" name="type" @formChange="eventTypeChange"></v-radio>
				</div>
				<template v-if="item.type === 'link'">
					<div class="form">
						<v-text lable="链接地址" :value="item.value" size="l" name="value" @formChange="eventChange"></v-text>
					</div>
				</template>
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
				<template v-if="item.type === 'interface'">
					<div class="form-list">
						<span class="form-lable">接口：</span>
						<div class="form-item" @click="openInterfaceModel">{{item.value.name}}</div>
					</div>
					<template v-if="item.value.param && item.value.param.length">
						<div class="form size-l" v-for="inf in item.value.param">
							<v-input-source v-if="inf.value.source === 'attr'" :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" type="select" :inputOptions="attrOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></v-input-source>
							<v-input-source v-else-if="inf.value.source === 'count'" :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" type="select" :inputOptions="countOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></v-input-source>
							<v-input-source v-else :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></v-input-source>
						</div>
					</template>
				</template>
				<form v-else>
					<div class="form">
						<v-radio lable="触发状态" :options="statusAttrOptions" :value="item.status.attr" name="attr" @formChange="statusChange"></v-radio>
					</div>
					<template v-if="item.status.attr === 'condition'">
						<div class="form">
							<v-radio lable="触发类型" :options="statusTypeOptions" :value="item.status.type" name="type" @formChange="statusTypeChange"></v-radio>
						</div>
						<div class="form" v-if="item.status.type === 'interface'">
							<div class="form-perch">
								<span class="lable">触发键：</span>
								<div class="perch-btn" @click="openInterfaceTreeModel">{{item.status.key.name}}</div>
							</div>
						</div>
						<div class="form" v-else>
							<v-text lable="触发键" :value="item.status.key" name="key" @formChange="statusChange"></v-text>
						</div>
						<div class="form">
							<v-text lable="触发值" :value="item.status.value" name="value" @formChange="statusChange"></v-text>
						</div>
					</template>
				</form>
			</template>
			<hr/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "panelEventForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			baseData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			weipageData: {
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
					label: '跳转链接',
					value: 'link'
				},{
					label: '本地事件',
					value: 'normal'
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
					label: '属性',
					value: 'attr'
				},{
					label: '表单',
					value: 'form'
				},{
					label: '计数器',
					value: 'count'
				}],
				statusAttrOptions: [{
					label: '立即触发',
					value: 'immediately'
				}, {
					label: '条件触发',
					value: 'condition'
				}],
				statusTypeOptions: [{
					label: '接口',
					value: 'interface'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'sessionStorage'
				}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'event'
				this.$emit('form-change', res)
			},
			parseClass: function(index) {
				if (index === this.formData.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			openInterfaceModel: function() {
				this.$emit('open-interface-model', 'event')
			},
			openPluginTreeModel: function() {
				this.$emit('open-plugin-tree-model', 'event')
			},
			selectEvent: function(index) {
				this.formChange({
					name: 'selectIndex',
					value: index
				})
			},
			addEvent: function() {
				const eventList = this.formData.eventList
				eventList.push({
					type: 'interface',
					key: '',
					value: {
						name: '点击选择接口'
					},
					status: {
						attr: 'immediately',
						type: 'interface',
						key: {
							name: '点击选择接口参数',
							url: '',
							keyList: []
						},
						value: ''
					}
				})
				this.formChange({
					name: 'eventList',
					value: eventList
				})
				this.formChange({
					name: 'selectIndex',
					value: eventList.length - 1
				})
			},
			deleteEvent: function() {
				const eventList = this.formData.eventList
				eventList.splice(this.formData.selectIndex, 1)
				this.formChange({
					name: 'selectIndex',
					value: 0
				})
				this.formChange({
					name: 'eventList',
					value: eventList
				})
			},
			eventTypeChange: function(res) {
				if (res.value === 'interface') {
					this.formData.eventList[this.formData.selectIndex]['value'] = {
						name: '点击选择接口'
					}
				} else if (res.value === 'normal') {
					this.formData.eventList[this.formData.selectIndex]['value'] = {
						name: '点击选择元件',
						id: '',
						options: [],
						actionName: '',
						actionId: ''
					}
				} else {
					this.formData.eventList[this.formData.selectIndex]['value'] = ''
				}
				this.eventChange(res)
			},
			eventChange: function(res) {
				const eventList = this.formData.eventList
				eventList[this.formData.selectIndex][res.name] = res.value
				this.formChange({
					name: 'eventList',
					value: eventList
				})
			},
			normalEventChange: function(res) {
				const v = this.formData.eventList[this.formData.selectIndex]['value']
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
				const interfaceInfo = this.formData.eventList[this.formData.selectIndex]['value']
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
			interfaceSourceChange: function(res) {
				if (res.value.source === 'form') {
					this.$emit('open-form-tree-model', {
						source: 'event',
						key: res.name
					})
				}
				this.interfaceChange(res)
			},
			statusChange(res) {
				const status = this.formData.eventList[this.formData.selectIndex]['status']
				status[res.name] = res.value
				const r = {
					name: 'status',
					value: status
				}
				this.eventChange(r)
			},
			statusTypeChange(res) {
				if (res.value === 'interface') {
					this.statusChange({
						name: 'key',
						value: {
							name: '点击选择接口参数',
							url: '',
							keyList: []
						}
					})
				} else {
					this.statusChange({
						name: 'key',
						value: ''
					})
				}
				this.statusChange(res)
			},
			openInterfaceTreeModel: function() {
				this.$emit('open-interface-tree-model', 'event')
			}
		},
		computed: {
			attrOptions() {
				const options = []
				for (let i = 0; i < this.baseData.attrList.length; i++) {
					options.push({
						label: this.baseData.attrList[i].name,
						value: this.baseData.attrList[i].key
					})
				}
				return options
			},
			countOptions() {
				const options = []
				for (let i = 0; i < this.weipageData.countEvent.eventList.length; i++) {
					options.push({
						label: this.weipageData.countEvent.eventList[i].name,
						value: this.weipageData.countEvent.eventList[i].countId
					})
				}
				return options
			}
		}
	}
</script>

<style>
	
</style>