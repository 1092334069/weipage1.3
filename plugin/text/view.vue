<template>
	<div class="text plugin" :data-id="viewData.pluginId" :style="parseStyle()" :class="parseClass()">
		<span>一行文本</span>
	</div>
</template>

<script>
	import commonMethod from '../commonMethod.js'

	export default {
		name: "textView",
		props: {
			viewData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			selectPluginId: {
				type: String,
				default: ''
			}
		},
		data () {
		    return {}
		},
		methods: commonMethod
	}
</script>

<style scoped>
	.text{
		display:inline-block;
	}
</style>