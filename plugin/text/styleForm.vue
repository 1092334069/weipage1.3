<template>
	<div>
		<div class="form">
			<v-number lable="字体大小" :value="formData.fontSize" name="fontSize" @formChange="formChange"></v-number>
		</div>
		<div class="form">
			<v-color lable="颜色" :value="formData.color" name="color" @formChange="formChange"></v-color>
		</div>
		<div class="form">
			<v-number lable="行高" :value="formData.lineHeight" name="lineHeight" @formChange="formChange"></v-number>
		</div>
		<div class="form">
			<v-radio lable="字体宽度" :options="fontWeightOptions" :value="formData.fontWeight" name="fontWeight" @formChange="formChange"></v-radio>
		</div>
		<div class="form">
			<v-radio lable="字体角度" :options="fontStyleOptions" :value="formData.fontStyle" name="fontStyle" @formChange="formChange"></v-radio>
		</div>
	</div>
</template>

<script>
	export default {
		name: "textStyleForm",
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
				fontWeightOptions: [{
					label: '默认',
					value: 'normal'
				},{
					label: '加粗',
					value: 'bold'
				}],
				fontStyleOptions: [{
					label: '默认',
					value: 'normal'
				},{
		    		label: '斜体',
					value: 'italic'
				}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'style'
				this.$emit('form-change', res)
			}
		}
	}
</script>

<style scoped>

</style>
