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
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @select-action-value="selectActionValue"></action-form>
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
	
</style>