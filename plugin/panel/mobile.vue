<template>
	<div class="panel plugin" :data-id="viewData.pluginId" :class="viewData.base.type">
		<template v-if="viewData.base.type == 'normal'">
			<div class="panel-item" :class="viewData.base.type" :style="parsePanelStyle()" @click="doEvent(parseEventOption(-1))">
				<template v-for="item in viewData.pluginList">
					<panel-view v-if="item.pluginType == 'panel'" :view-data="item" :view-data-index-list="viewDataIndexList" @do-event="doEvent"></panel-view>
					<text-view v-else-if="item.pluginType == 'text'" :view-data="item" :view-data-index-list="viewDataIndexList"></text-view>
					<image-view v-else-if="item.pluginType == 'image'" :view-data="item" :view-data-index-list="viewDataIndexList"></image-view>
					<form-view v-else-if="item.pluginType == 'form'" :view-data="item" :view-data-index-list="viewDataIndexList"></form-view>
				</template>
			</div>
		</template>
		<template v-else-if="viewData.base.type == 'swiper'">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(temp,index) in viewData.base.data">
						<div class="panel-item" :class="viewData.base.type" :style="parsePanelStyle()" @click="doEvent(parseEventOption(index))">
							<template v-for="item in viewData.pluginList">
								<panel-view v-if="item.pluginType == 'panel'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)" @do-event="doEvent"></panel-view>
								<text-view v-else-if="item.pluginType == 'text'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></text-view>
								<image-view v-else-if="item.pluginType == 'image'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></image-view>
								<form-view v-else-if="item.pluginType == 'form'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></form-view>
							</template>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else-if="viewData.base.data && viewData.base.data.length">
			<div v-for="(temp,index) in viewData.base.data" class="panel-item" :class="viewData.base.type" :style="parsePanelStyle()" @click="doEvent(parseEventOption(index))">
				<template v-for="item in viewData.pluginList">
					<panel-view v-if="item.pluginType == 'panel'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)" @do-event="doEvent"></panel-view>
					<text-view v-else-if="item.pluginType == 'text'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></text-view>
					<image-view v-else-if="item.pluginType == 'image'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></image-view>
					<form-view v-else-if="item.pluginType == 'form'" :view-data="item" :view-data-index-list="parseViewDataIndexList(index)" :index-list="parseIndexList(index)"></form-view>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
	import mobileMethods from '../mobileMethods.js'

	export default {
		name: "panelView",
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
			},
			indexList: {
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
	.panel{
		overflow:hidden;
	}
	.panel .panel{
		display:inline-block;
	}
	.panel .panel-item{
		width:100%;
		height:100%;
		position:relative;
		background-size:100% auto;
		background-repeat:no-repeat;
	}
	.panel.slider{
		overflow-x:auto;
		white-space:nowrap;
	}
	.panel.waterfall{
		column-count:2;
	}
	.panel.waterfall>.panel-item{
		break-inside:avoid;
		width:auto;
		height:auto;
	}
	.panel .panel-item.slider{
		display:inline-block;
		white-space:normal;
		width:66%;
	}
</style>