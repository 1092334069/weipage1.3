<template>
	<div>
		<ul class="tree-list">
			<li v-for="item in pluginList">
				<div class="tree-item">{{item.base.name}}</div>
				<div class="tree-child" v-if="item.pluginList && item.pluginList.length">
					<plugin-tree-list :plugin-list="item.pluginList" :select-plugin-id="selectPluginId"></plugin-tree-list>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "pluginTreeList",
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
.tree-list li{
	position:relative;
}
.tree-item{
	padding:10px;
	width:100px;
	display:inline-block;
}
.tree-child{
	position:absolute;
	left:120px;
	top:0;
}
</style>