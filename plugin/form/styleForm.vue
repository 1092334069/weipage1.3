<template>
	<div>
		<div class="form">
			<v-number lable="宽度" :value="formData.width" name="width" @formChange="formChange"></v-number>
		</div>
		<div class="form">
			<v-number lable="高度" :value="formData.height" name="height" @formChange="formChange"></v-number>
		</div>
		<div class="form">
			<v-number lable="字体大小" :value="formData.fontSize" name="fontSize" @formChange="formChange"></v-number>
		</div>
		<div class="form">
			<v-color lable="字体颜色" :value="formData.color" name="color" @formChange="formChange"></v-color>
		</div>
		<div class="form">
			<v-color lable="背景颜色" :value="formData.backgroundColor" name="backgroundColor" @formChange="formChange"></v-color>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.backgroundImage" name="backgroundImage" @formChange="formChange"></v-image>
		</div>
	</div>
</template>

<script>
	export default {
		name: "formStyleForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
			return {}
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