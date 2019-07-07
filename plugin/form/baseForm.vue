<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="默认值" :value="formData.data" size="l" name="data" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="表单键" :value="formData.key" size="l" name="key" placeholder="请输入字母" @formChange="formChange"></v-text>
		</div>
		<v-radio lable="表单类型" :options="typeOptions" :value="formData.type" name="type" @formChange="formChange"></v-radio>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @select-action-value="selectActionValue"></action-form>
		<form v-if="formData.type === 'select'">
			<div class="form-list">
				<div class="form-lable">选项：</div>
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.optionList" @click="selectOption(index)">{{item.label}}</div>
				<div class="add-module" @click="addOption"></div>
			</div>
			<div class="sub-form-list" v-if="formData.optionList && formData.optionList.length">
				<hr/>
				<template v-for="(item,index) in formData.optionList" v-if="formData.optionSelectIndex === index">
					<div class="delete-module" @click="deleteOption"></div>
					<div class="form">
						<v-text lable="选项名" :value="item.label" name="label" @formChange="optionChange"></v-text>
					</div>
					<div class="form">
						<v-text lable="选项值" :value="item.value" name="value" @formChange="optionChange"></v-text>
					</div>
				</template>
				<hr/>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: "formBaseForm",
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
				actionKeyList: [{
					label: '数据',
					value: 'data'
				},{
					label: '样式 宽度',
					value: 'width'
				},{
					label: '样式 高度',
					value: 'height'
				},{
					label: '样式 字体大小',
					value: 'fontSize'
				},{
					label: '样式 文字颜色',
					value: 'color'
				}],
				typeOptions: [{
					label: '文本',
					value: 'text'
				},{
					label: '数字',
					value: 'number'
				},{
					label: '电话',
					value: 'tel'
				},{
					label: '选项',
					value: 'select'
				}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'base'
				this.$emit('form-change', res)
			},
			selectActionValue: function() {
				this.$emit('open-interface-tree-model', 'baseAction')
			},
			parseClass: function(index) {
				if (index === this.formData.optionSelectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectOption: function(index) {
				this.formChange({
					name: 'optionSelectIndex',
					value: index
				})
			},
			addOption: function() {
				const optionList = this.formData.optionList
				optionList.push({
					label: '',
					value: ''
				})
				this.formChange({
					name: 'optionList',
					value: optionList
				})
				this.formChange({
					name: 'optionSelectIndex',
					value: optionList.length - 1
				})
			},
			deleteOption: function() {
				const optionList = this.formData.optionList
				optionList.splice(this.formData.optionSelectIndex, 1)
				this.formChange({
					name: 'optionSelectIndex',
					value: 0
				})
				this.formChange({
					name: 'optionList',
					value: optionList
				})
			},
			optionChange: function(res) {
				const optionList = this.formData.optionList
				optionList[this.formData.optionSelectIndex][res.name] = res.value
				this.formChange({
					name: 'optionList',
					value: optionList
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