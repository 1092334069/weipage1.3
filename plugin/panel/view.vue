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
				return 'width:' + this.parseStyleWidth() + ';height:' + this.parseStyleHeight() + ';backgroundColor:' + this.viewData.style.fill.color
			},
			parseStyleWidth() {
				var option = this.viewData.style.shape.width
				if (option.quantifier === 'px') {
					return option.value
				} else {
					return option.value * 375 / 100
				}
			},
			parseStyleHeight() {
				var option = this.viewData.style.shape.height
				if (option.quantifier === 'px') {
					return option.value
				} else {
					return option.value * 667 / 100
				}
			}
		}
	}
</script>

<style scoped>
	
</style>