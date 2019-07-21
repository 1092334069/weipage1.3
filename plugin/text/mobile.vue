<template>
	<div class="text plugin" :data-id="viewData.pluginId" :style="parseTextStyle()">
		<span v-if="viewData.base.data">{{viewData.base.data}}</span>
		<span v-else>{{viewData.base.name}}</span>
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "textView",
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
	.text{
		display:inline-block;
		max-width:100%;
		word-wrap:break-word;
	}
</style>