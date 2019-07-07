<template>
	<div class="base-form">
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-radio lable="类型" :options="typeList" :value="formData.type" name="type" @formChange="formChange"></v-radio>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @select-action-value="selectActionValue"></action-form>
		<form>
			<div class="form-list">
				<div class="form-lable">属性：</div>
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.attrList" @click="selectAttr(index)">{{item.name}}</div>
				<div class="add-module" @click="addAttr"></div>
			</div>
			<div class="sub-form-list" v-if="formData.attrList && formData.attrList.length">
				<hr/>
				<template v-for="(item,index) in formData.attrList" v-if="formData.attrSelectIndex === index">
					<div class="delete-module" @click="deleteAttr"></div>
					<div class="form">
						<v-text lable="属性键" :value="item.key" name="key" placeholder="请输入字母" @formChange="attrChange"></v-text>
					</div>
					<div class="form">
						<div class="attr-interface">
							<span class="lable">属性值：</span>
							<div class="interface-btn" @click="selectAttrValue">{{item.name}}</div>
						</div>
					</div>
				</template>
				<hr/>
			</div>
		</form>
	</div>
</template>

<script>
	import { getLocalUuid } from '../pluginAction.js'

	export default {
		name: "panelBaseForm",
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
				typeList: [{
					label: '普通',
					value: 'normal'
				},{
					label: '列表',
					value: 'list'
				},{
					label: '瀑布流',
					value: 'waterfall'
				},{
					label: '轮播',
					value: 'swiper'
				},{
					label: '滑块',
					value: 'slider'
				}],
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
					label: '样式 外边距',
					value: 'margin'
				},{
					label: '样式 内边距',
					value: 'padding'
				},{
					label: '样式 圆角',
					value: 'borderRadius'
				},{
					label: '样式 旋转',
					value: 'transformRotate'
				},{
					label: '样式 边框',
					value: 'border'
				},{
					label: '样式 定位',
					value: 'position'
				},{
					label: '样式 颜色',
					value: 'backgroundColor'
				},{
					label: '样式 图片',
					value: 'backgroundImage'
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
				if (index === this.formData.attrSelectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAttrValue: function() {
				this.$emit('open-interface-tree-model', 'baseAttr')
			},
			selectAttr: function(index) {
				this.formChange({
					name: 'attrSelectIndex',
					value: index
				})
			},
			addAttr: function() {
				const attrList = this.formData.attrList
				const uuid = getLocalUuid()
				attrList.push({
					attrId: uuid,
					attrKey: '',
					name: '请选择属性',
					url: '',
					keyList: []
				})
				this.formChange({
					name: 'attrList',
					value: attrList
				})
				this.formChange({
					name: 'attrSelectIndex',
					value: attrList.length - 1
				})
			},
			deleteAttr: function() {
				const attrList = this.formData.attrList
				attrList.splice(this.formData.attrSelectIndex, 1)
				this.formChange({
					name: 'attrSelectIndex',
					value: 0
				})
				this.formChange({
					name: 'attrList',
					value: attrList
				})
			},
			attrChange: function(res) {
				const attrList = this.formData.attrList
				attrList[this.formData.attrSelectIndex][res.name] = res.value
				this.formChange({
					name: 'attrList',
					value: attrList
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
	.attr-interface{
		position:relative;
		margin:5px 0;
		padding-left:85px;
	}
	.attr-interface .lable{
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
	.attr-interface .interface-btn{
		height: 36px;
		line-height: 36px;
		padding:0 10px;
		border:1px solid #e5e5e5;
		border-radius:4px;
		cursor:pointer;
		display:inline-block;
		background-color:#fff;
	}
</style>