<template>
	<div class="image plugin" :data-id="viewData.pluginId" :style="parseImageStyle()">
		<img v-if="viewData.base.data" :src="viewData.base.data" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "imageView",
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
		methods: styleView
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