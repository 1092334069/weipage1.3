<template>
	<div>
		<div class="form">
			<v-number lable="宽度" :value="formData.width" name="width" @formChange="formChange"></v-number>
		</div>
	</div>
</template>

<script>
	export default {
		name: "imageStyleForm",
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
