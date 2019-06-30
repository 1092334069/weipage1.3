<template>
	<div class="vSelect" :style="{paddingLeft:lableWidth}">
		<span v-if="lable" class="lable" :style="{width:lableWidth}">{{lable}}：</span>
		<select ref="form" @change="formChange">
			<option v-for="item in options" :value="item.value" :selected="checkTheSame(item.value, value)">{{item.label}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: "vSelect",
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
				type: [String, Number]
			}
		},
		data () {
		    return {}
		},
		methods: {
			checkTheSame: function(a, b) {
				if (a === b) {
					return true
				} else {
					return false
				}
			},
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
	.vSelect{
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
	.vSelect select{
		min-width:100px;
		height:26px;
		font-size:14px;
	}
</style>