<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.data" name="data" @formChange="formChange"></v-image>
		</div>
		<action-form :form-data="formData" :action-key-list="actionKeyList" @form-change="formChange" @open-interface-tree-model="openInterfaceTreeModel"></action-form>
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
					value: 'data'
		    	},{
		    		label: '样式 宽度',
		    		value: 'width'
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
	
</style>