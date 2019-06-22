<template>
	<div class="vInput" :style="{paddingLeft:lableWidth}">
		<span v-if="lable" class="lable" :style="{width:lableWidth}">{{lable}}：</span>
		<input type="color" ref="form" :value="value" @input="formChange" />
	</div>
</template>

<script>
	export default {
		name: "vColor",
		props: {
			value: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			lable: {
				type: String,
				default: ''
			},
			lableWidth:{
				type: Number,
				default: 80
			}
		},
		data () {
		    return {}
		},
		methods: {
			formChange: function() {
				var res = {
					name: this.name,
					value: this.$refs.form.value
				}
				this.$emit('formChange', res)
			}
		}	
	}
</script>

<style scoped>
	.vInput{
		margin:6px;
		position:relative;
		display:inline-block;
	}
	.lable{
		display:inline-block;
		font-size:14px;
		text-align:right;
		position:absolute;
		left:0;
		top:0;
		height:28px;
		line-height:28px;
	}
	.vInput input{
		padding:5px;
		border:1px solid #e5e5e5;
		border-radius:2px;
	}
	.vInput input:hover{
		border-color:#138ed4;
	}
	.vInput input[type='color']{
		width:60px;
	}
</style>