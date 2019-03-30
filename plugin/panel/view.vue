<template>
	<div class="pannel plugin" :data-id="viewData.pluginId" :style="parseStyle()" :class="parseClass()"></div>
</template>

<script>
	import commonMethod from '../commonMethod.js'

	export default {
		name: "panelView",
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
	.pannel{
		background-size: 100% 100%;
	}
</style>