<template>
	<div>
		<ul class="tree-list">
			<li v-for="item in pluginList">
				<div class="tree-item form" v-if="item.pluginType === 'form'" @click="selectPlugin(item.pluginId)">{{item.base.name}}:{{item.base.key}}</div>
				<div class="tree-item other" v-else>{{item.base.name}}</div>
				<div class="tree-child" v-if="item.pluginList && item.pluginList.length">
					<div v-if="item.pluginId != showPluginId" class="tree-child-more" @click="showChildTree(item.pluginId)"></div>
					<form-tree v-if="showPluginId == item.pluginId" :plugin-list="item.pluginList"  @form-tree-select="selectPlugin"></form-tree>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "formTree",
		props: {
			pluginList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
		    	showPluginId: ''
		    }
		},
		methods: {
			showChildTree: function(pluginId) {
				this.showPluginId = pluginId
			},
			selectPlugin: function(pluginId) {
				this.$emit('form-tree-select', {
					pluginId: pluginId
				})
			}
		}
	}
</script>

<style scoped>
.tree-list{
	position:relative;
}
.tree-child .tree-list:before{
	content:"";
	width:0;
	height:0;
	border-top:10px solid transparent;
	border-bottom:10px solid transparent;
	border-right:20px solid #f0f0f0;
	position:absolute;
	top:10px;
	left:-20px;
}
.tree-list li{
	position:relative;
	padding-bottom:5px;
}
.tree-item{
	padding:10px;
	height:40px;
	line-height:20px;
	width:120px;
	display:inline-block;
	background-color:#f0f0f0;
	position:relative;
}
.tree-item.other{
	opacity:0.2;
}
.tree-item.form{
	cursor:pointer;
}
.tree-child{
	position:absolute;
	left:120px;
	top:0;
	padding-left:40px;
	z-index:3;
}
.tree-child .tree-child-more{
	width:20px;
	height:20px;
	background-image:url('../img/icon-more.png');
	background-size:100% 100%;
	position:absolute;
	left:10px;
	top:10px;
	cursor:pointer;
}
</style>