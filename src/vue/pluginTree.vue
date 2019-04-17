<template>
	<div class="plugin-tree-page hidden">
		<div class="plugin-tree-dialog">
			<div class="dialog-head">
				<span>插件树</span>
				<div class="dialog-close"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pluginTree",
		props: {
			pluginList: {
				type: Array,
				default: function() {
					return []
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
		methods: {

		}
	}
</script>

<style scoped>

</style>