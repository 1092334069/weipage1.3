<template>
	<div class="form plugin" :class="{current: selectPluginId === viewData.pluginId}" :data-id="viewData.pluginId">
		<select v-if="viewData.base.type === 'select'" :style="parseFormStyle()">
			<option v-for="item in viewData.base.optionList">{{item.label}}</option>
		</select>
		<input v-else :style="parseFormStyle()" :value="viewData.base.data" />
		<Icon size="12" class="drop-icon" v-if="selectPluginId === viewData.pluginId" type="md-move" />
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
		margin-bottom:2px;
		position:relative;
	}
	.form input{
		border:none;
		cursor:pointer;
	}
	.form select{
		border:none;
		cursor:pointer;
	}
</style>