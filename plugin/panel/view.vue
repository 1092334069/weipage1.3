<template>
	<div class="pannel" :style="parseStyle()"></div>
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