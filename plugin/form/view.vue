<template>
	<div class="form plugin" :class="{current: selectPluginId === viewData.pluginId}" :data-id="viewData.pluginId">
		<input :style="parseFormStyle()" :value="viewData.base.data" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "formView",
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
		methods: styleView
	}
</script>

<style scoped>
	.form{
		display:inline-block;
		max-width:100%;
	}
	.form input{
		border:none;
		cursor:pointer;
	}
</style>