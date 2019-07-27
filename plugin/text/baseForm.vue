<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="默认值" :value="formData.data" size="xl" name="data" @formChange="formChange"></v-text>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @select-action-value="selectActionValue"></action-form>
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
					value: 'base.data'
				},{
					label: '样式 字体大小',
					value: 'style.fontSize'
				},{
					label: '样式 颜色',
					value: 'style.color'
				},{
					label: '样式 行高',
					value: 'style.lineHeight'
				},{
					label: '样式 字体宽度',
					value: 'style.fontWeight'
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