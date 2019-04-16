<template>
	<div class="image plugin" :data-id="viewData.pluginId" :style="parseStyle()" :class="parseClass()">
		<img />
	</div>
</template>

<script>
	import commonMethod from '../commonMethod.js'

	export default {
		name: "imageView",
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
	.image{
		display:inline-block;
	}
	.image img{
		min-width:10px;
		min-height:10px;
	}
</style>