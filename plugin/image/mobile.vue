<template>
	<div class="image plugin" :data-id="viewData.pluginId" :style="parseImageStyle()">
		<img v-if="parseBaseData()" :src="parseBaseData()" />
	</div>
</template>

<script>
	import mobileMethods from '../mobileMethods.js'

	export default {
		name: "imageView",
		props: {
			viewData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			viewDataIndexList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {}
		},
		methods: mobileMethods
	}
</script>

<style scoped>
	.image{
		display:inline-block;
	}
	.image img{
		width:100%;
	}
</style>