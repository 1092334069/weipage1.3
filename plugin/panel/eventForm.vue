<template>
	<div>
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
					<v-radio lable="类型" :options="eventTypeList" :value="item.type" name="type" @formChange="eventTypeChange"></v-radio>
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
							<v-input-source :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" @formChange="interfaceChange"></v-input-source>
						</div>
					</template>
				</template>
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
			}
		},
		data () {
			return {
				eventTypeList: [{
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
					value: 'cookie'
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
			}
		}
	}
</script>

<style scoped>
	.form{
		position:relative;
		margin:5px 0;
	}
	.form-list{
		position:relative;
		overflow:hidden;
		margin:5px 0;
		padding-left:85px;
	}
	.form-list .form-lable{
		width:85px;
		display: inline-block;
	    font-size: 14px;
	    text-align: right;
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 40px;
	    line-height: 40px;
	}
	.form-item{
		padding:0 10px;
		margin-right:10px;
		border-radius:4px;
		height:40px;
		line-height:40px;
		background-color:#fff;
		display:inline-block;
		border:1px solid #fff;
		float:left;
		cursor:pointer;
	}
	.form-item.current{
		border:1px solid #138ed4;
	}
	.add-module{
		width:40px;
		height:40px;
		background-image:url('../../src/img/icon-add.png');
		background-size:24px 24px;
		background-repeat:no-repeat;
		background-position:center;
		cursor:pointer;
		display:inline-block;
		float:left;
	}
	.sub-form-list{
		background-color:#f0f0f0;
		margin-left:80px;
		position:relative;
	}
	.delete-module{
		width:40px;
		height:40px;
		background-image:url('../../src/img/icon-delete.png');
		background-size:24px 24px;
		background-repeat:no-repeat;
		background-position:center;
		cursor:pointer;
		display:inline-block;
		position:absolute;
		right:10px;
		top:10px;
		z-index:10;
	}
</style>