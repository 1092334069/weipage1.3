<template>
	<div class="base-form">
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-radio lable="类型" :options="typeList" :value="formData.type" name="type" @formChange="formChange"></v-radio>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @open-interface-tree-model="openInterfaceTreeModel"></action-form>
	</div>
</template>

<script>
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
			openInterfaceTreeModel: function() {
				this.$emit('open-interface-tree-model', 'base')
			}
		}
	}
</script>

<style scoped>
	.form{
		position:relative;
		margin:5px 0;
	}
</style>