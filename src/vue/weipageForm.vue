<template>
	<div>
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="描述" :value="formData.describes" size="l" name="describes" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.cover" name="cover" @formChange="weipageChange"></v-image>
		</div>
		<div class="form">
			<v-text lable="英文名" :value="formData.pageName" size="l" name="pageName" @formChange="weipageChange"></v-text>
		</div>
	</div>
</template>

<script>
	export default {
		name: "weipageForm",
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
		    	
		    }
		},
		methods: {
			weipageChange: function(res) {
				this.$emit('weipage-change', res)
			}
		}
	}
</script>

<style>
	
</style>