<template>
	<div class="plugin-tree-dialog">
		<div class="dialog-head">
			<span>插件树</span>
			<div class="dialog-close" @click="closePluginTree"></div>
		</div>
		<div class="dialog-body">
			<plugin-tree-list :plugin-list="pluginList" :select-plugin-id="selectPluginId" @select-plugin="selectPlugin"></plugin-tree-list>
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
			closePluginTree: function() {
				this.$emit('close-plugin-tree','')
			},
			selectPlugin: function(pluginId) {
				this.$emit('select-plugin',pluginId)
			}
		}
	}
</script>

<style scoped>
.plugin-tree-dialog{
	position:absolute;
	left:50%;
	top:50%;
	transform:translate(-50%,-50%);
	border-radius:8px;
	width:600px;
	height:400px;
	background-color:#fff;
}
.plugin-tree-dialog .dialog-head{
	height:40px;
	line-height:40px;
	background-color:#ddd;
	font-size:20px;
	padding:0 20px;
	position:relative;
	border-radius:8px 8px 0 0;
}
.plugin-tree-dialog .dialog-close{
	width:24px;
	height:24px;
	right:8px;
	top:8px;
	position:absolute;
	background-image:url('../img/icon-close.png');
	background-size:100% 100%;
	cursor:pointer;
}
.plugin-tree-dialog .dialog-body{
	padding:10px 20px;
}
</style>