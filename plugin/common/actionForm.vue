<template>
	<form>
		<div class="form-list">
			<div class="form-lable">响应：</div>
			<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.actionList" @click="selectAction(index)">{{item.name}}</div>
			<div class="add-module" @click="addAction"></div>
		</div>
		<div class="sub-form-list" v-if="formData.actionList && formData.actionList.length">
			<hr/>
			<template v-for="(item,index) in formData.actionList" v-if="formData.selectIndex === index">
				<div class="delete-module" @click="deleteAction"></div>
				<div class="form">
					<v-text lable="响应名" :value="item.name" name="name" @formChange="actionChange"></v-text>
				</div>
				<div class="form">
					<v-select lable="响应键" :options="actionKeyList" :value="item.key" name="key" @formChange="actionChange"></v-select>
				</div>
				<div class="form">
					<v-radio lable="响应条件" :options="actionConditionList" :value="item.condition" name="condition" @formChange="actionChange"></v-radio>
				</div>
				<div class="form">
					<v-radio lable="响应类型" :options="actionTypeList" :value="item.type" name="type" @formChange="actionTypeChange"></v-radio>
				</div>
				<div class="form form-short" v-if="item.type === 'static'">
					<v-number v-if="actionKeyType === 'number'" lable="响应值" :value="item.value" name="value" @formChange="actionChange"></v-number>
					<v-color v-else-if="actionKeyType === 'color'" lable="响应值" :value="item.value" name="value" @formChange="actionChange"></v-color>
					<v-image v-else-if="actionKeyType === 'image'" lable="响应值" :value="item.value" name="value" @formChange="actionChange" @selectImage="selectImage"></v-image>
					<v-select v-else-if="actionKeyType === 'select'" lable="响应值" :options="actionValueOptions":value="item.value" name="value" @formChange="actionChange"></v-select>
					<v-four-sides v-else-if="actionKeyType === 'fourSides'" lable="响应值" :value="item.value" name="value" @formChange="actionChange"></v-four-sides>
					<v-text v-else lable="响应值" :value="item.value" name="value" @formChange="actionChange"></v-text>
				</div>
				<div class="form" v-else-if="item.type === 'interface'">
					<div class="action-interface">
						<span class="lable">响应值：</span>
						<div class="interface-btn" @click="selectActionValue">{{item.value.name}}</div>
					</div>
				</div>
				<div class="form" v-else>
					<v-text lable="响应值" :value="item.value" size="l" name="value" @formChange="actionChange"></v-text>
				</div>
			</template>
			<hr/>
		</div>
	</form>
</template>

<script>
	import { getLocalUuid } from '../pluginAction.js'

	export default {
		name: "actionForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			actionKeyList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
				actionTypeList: [{
					label: '接口',
					value: 'interface'
				},{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'sessionStorage'
				}],
				actionConditionList: [{
					label: '加载触发',
					value: 'loading'
				},{
					label: '事件触发',
					value: 'event'
				}]
			}
		},
		computed: {
			actionValueOptions: function() {
				let r = []
				for (let i = 0; i < this.actionKeyList.length; i++) {
					if (this.actionKeyList[i].value === this.formData.actionList[this.formData.selectIndex].key) {
						r = this.actionKeyList[i].options
					}
				}
				return r
			},
			actionKeyType: function() {
				let r = ''
				for (let i = 0; i < this.actionKeyList.length; i++) {
					if (this.actionKeyList[i].value === this.formData.actionList[this.formData.selectIndex].key) {
						r = this.actionKeyList[i].type
					}
				}
				return r
			}
		},
		methods: {
			formChange: function(res) {
				this.$emit('form-change', res)
			},
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			parseClass: function(index) {
				if (index === this.formData.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAction: function(index) {
				this.formChange({
					name: 'selectIndex',
					value: index
				})
			},
			actionTypeChange: function(res) {
				if (res.value === 'interface') {
					this.formData.actionList[this.formData.selectIndex]['value'] = {
						name: '点击选择接口参数',
						url: '',
						keyList: []
					}
				} else {
					this.formData.actionList[this.formData.selectIndex]['value'] = ''
				}
				this.actionChange(res)
			},
			actionChange: function(res) {
				const actionList = this.formData.actionList
				actionList[this.formData.selectIndex][res.name] = res.value
				this.formChange({
					name: 'actionList',
					value: actionList
				})
			},
			addAction: function() {
				const actionList = this.formData.actionList
				const uuid = getLocalUuid()
				actionList.push({
					actionId: uuid,
					name: '响应',
					key: 'base.data',
					condition: 'loading',
					type: 'interface',
					value: {
						name: '点击选择接口参数',
						url: '',
						keyList: []
					}
				})
				this.formChange({
					name: 'actionList',
					value: actionList
				})
				this.formChange({
					name: 'selectIndex',
					value: actionList.length - 1
				})
			},
			selectActionValue: function() {
				this.$emit('select-action-value')
			},
			deleteAction: function() {
				const actionList = this.formData.actionList
				actionList.splice(this.formData.selectIndex, 1)
				this.formChange({
					name: 'selectIndex',
					value: 0
				})
				this.formChange({
					name: 'actionList',
					value: actionList
				})
			}
		}
	}
</script>

<style scoped>
	.form{
		position:relative;
		margin:5px 0;
	}
	.form-short{
		width:300px;
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
	.action-interface{
		position:relative;
		margin:5px 0;
		padding-left:85px;
	}
	.sub-form-list{
		background-color:#f0f0f0;
		margin-left:80px;
		position:relative;
	}
	.action-interface .lable{
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
	.action-interface .interface-btn{
		height: 36px;
		line-height: 36px;
		padding:0 10px;
		border:1px solid #e5e5e5;
		border-radius:4px;
		cursor:pointer;
		display:inline-block;
		background-color:#fff;
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
