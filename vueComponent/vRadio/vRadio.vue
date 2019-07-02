<template>
	<div class="vRadio" :style="{paddingLeft:lableWidth}">
		<span v-if="lable" class="lable" :style="{width:lableWidth}">{{lable}}：</span>
		<div v-for="item in options" class="radio-item">
			<input type="radio" v-if="item.value == value" :value="item.value" :name="name" checked="checked" @input="formChange" />
			<input type="radio" v-else :value="item.value" :name="name" @input="formChange" />
			<span>{{item.label}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "vRadio",
		props: {
			lable: {
				type: String,
				default: ''
			},
			lableWidth: {
				type: Number,
				default: 80
			},
			options: {
				type: Array,
				default: function() {
					return []
				}
			},
			name: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			}
		},
		data () {
		    return {}
		},
		methods: {
			formChange: function(e) {
				var res = {
					name: this.name,
					value: e.path[0].defaultValue
				}
				this.$emit('formChange', res)
			}
		}		
	}
</script>

<style scoped>
	.vRadio{
		margin:6px;
		position:relative;
		display:inline-block;
	}
	.lable{
		display:inline-block;
		font-size:14px;
		text-align:right;
		position:absolute;
		top:0;
		left:0;
		height:28px;
		line-height:28px;
	}
	.radio-item{
		display:inline-block;
		height:28px;
		padding-right:20px;
		line-height: 28px;
	}
	.radio-item span{
		vertical-align: middle;
	}
	input[type='radio']{
		width:16px;
		height:16px;
		-webkit-appearance: none;
		background-image: url(../../src/img/icon-radio.png);
		background-size: 100% 100%;
		vertical-align: middle;
	}
	input[type='radio'][checked='checked'] {
		background-image: url(../../src/img/icon-radio-current.png);
	}
</style>