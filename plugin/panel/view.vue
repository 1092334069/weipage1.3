<template>
	<div class="pannel" :style="parseStyle()"></div>
</template>

<script>
	export default {
		name: "pannelView",
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
		methods: {
			parseStyle() {
				console.log(this.viewData)
				return 'width:' + this.viewData.style.shape.width.value + ';height:' + this.viewData.style.shape.height.value + ';backgroundColor:' + this.viewData.style.fill.color
			}
		}
	}
</script>

<style scoped>
	
</style>