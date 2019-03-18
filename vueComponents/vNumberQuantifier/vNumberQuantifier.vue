<template>
	<div>
		<v-number :lable="lable" :value="value" :name="name" @formChange="formChange"></v-number>
		<span class="quantifier" @click="changeQuantifier">{{quantifier}}</span>
	</div>
</template>

<script>
	export default {
		name: "vNumberQuantifier",
		props: {
			value: {
				type: Number,
				default: 0
			},
			quantifier: {
				type: String,
				default: 'px'
			},
			quantifierValue: {
				type: String,
				default: 'vw'
			},
			name: {
				type: String,
				default: ''
			},
			lable: {
				type: String,
				default: ''
			}
		},
		data () {
		    return {}
		},
		methods: {
			formChange: function(res) {
				var result = {
					pname: '',
					name: res.name,
					value: {
						value: res.value,
						quantifier: this.quantifier
					}
				}
				this.$emit('formChange', result)
			},
			changeQuantifier: function() {
				var quantifier = ''
				if (this.quantifier === 'px') {
					quantifier = this.quantifierValue
				} else {
					quantifier = 'px'
				}
				var result = {
					pname: '',
					name: this.name,
					value: {
						value: this.value,
						quantifier: quantifier
					}
				}
				this.$emit('formChange', result)
			}
		}
	}
</script>

<style scoped>
	.quantifier{
		display:inline-block;
		padding:5px;
		cursor:pointer;
	}
</style>
