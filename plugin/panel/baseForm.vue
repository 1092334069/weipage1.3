<template>
	<div class="plugin-form">
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
						<div class="form-perch">
							<span class="lable">属性值：</span>
							<div class="perch-btn" @click="selectAttrValue">{{item.name}}</div>
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
					value: 'base.data'
				},{
					label: '样式 宽度',
					value: 'style.width'
				},{
					label: '样式 高度',
					value: 'style.height'
				},{
					label: '样式 外边距',
					value: 'style.margin'
				},{
					label: '样式 内边距',
					value: 'style.padding'
				},{
					label: '样式 圆角',
					value: 'style.borderRadius'
				},{
					label: '样式 旋转',
					value: 'style.transformRotate'
				},{
					label: '样式 边框',
					value: 'style.border'
				},{
					label: '样式 定位',
					value: 'style.position'
				},{
					label: '样式 颜色',
					value: 'style.backgroundColor'
				},{
					label: '样式 图片',
					value: 'style.backgroundImage'
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

<style>

</style>