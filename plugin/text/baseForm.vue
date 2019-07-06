<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="默认值" :value="formData.data" size="xl" name="data" @formChange="formChange"></v-text>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @open-interface-tree-model="openInterfaceTreeModel"></action-form>
	</div>
</template>

<script>
	export default {
		name: "textBaseForm",
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
				actionKeyList:[{
					label: '值',
					value: 'data'
				},{
					label: '样式 字体大小',
					value: 'fontSize'
				},{
					label: '样式 颜色',
					value: 'color'
				},{
					label: '样式 行高',
					value: 'lineHeight'
				},{
					label: '样式 字体宽度',
					value: 'fontWeight'
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

<style>
	.form{
		position:relative;
		margin:5px 0;
	}
</style>