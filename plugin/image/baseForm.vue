<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.data" name="data" @selectImage="selectImage"></v-image>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @select-action-value="selectActionValue" @select-image="actionSelectImage"></action-form>
	</div>
</template>

<script>
	export default {
		name: "imageBaseForm",
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
					label: '图片',
					value: 'base.data',
					type: 'image'
		    	},{
		    		label: '样式 宽度',
		    		value: 'style.width',
		    		type: 'number'
		    	}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'base'
				this.$emit('form-change', res)
			},
			selectImage: function(res) {
				res['pname'] = 'base'
				this.$emit('select-image', res)
			},
			actionSelectImage: function(res) {
				this.$emit('action-select-image', res)
			},
			selectActionValue: function() {
				this.$emit('open-interface-tree-model', 'baseAction')
			}
		}
	}
</script>

<style>
	
</style>