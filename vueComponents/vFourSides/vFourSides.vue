<template>
	<div>
		<v-number v-if="isValueNumber" :lable="lable" :value="value" :name="name" @formChange="formChange"></v-number>
		<v-text v-else :lable="lable" :value="valueStr" :isReadOnly="isReadOnly" :name="name" @formChange="formChange"></v-text>
		<div class="more-input" :class="{close:subFormValid}" @click="triggerSubForm"></div>
		<div class="sub-form" v-if="subFormValid">
			<v-number lable="上" size="s" :lableWidth="lableWidth" :value="formTop" :pname="name" name="top" @formChange="formChange"></v-number>
			<v-number lable="右" size="s" :lableWidth="lableWidth" :value="formRight" :pname="name" name="right" @formChange="formChange"></v-number>
			<v-number lable="下" size="s" :lableWidth="lableWidth" :value="formBottom" :pname="name" name="bottom" @formChange="formChange"></v-number>
			<v-number lable="左" size="s" :lableWidth="lableWidth" :value="formLeft" :pname="name" name="left" @formChange="formChange"></v-number>
		</div>
	</div>
</template>

<script>
	export default {
		name: "vFourSides",
		props: {
			value: [Number, Array],
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
		    return {
		    	lableWidth: 30,
		    	subFormValid: false,
		    	isReadOnly: true
		    }
		},
		methods: {
			formChange: function(res) {
				var result
				if (res.pname) {
					var sList = [this.formTop, this.formRight, this.formBottom, this.formLeft]
					result = this.mergeSubForm(sList, res.pname, res.name, res.value)
				} else{
					result = res
				}
				this.$emit('formChange', result)
			},
			triggerForm: function(key) {
				if (this.formValid[key]) {
					this.formValid[key] = false
				} else {
					this.formValid[key] = true
				}
			},
			triggerSubForm: function() {
				if (this.subFormValid) {
					this.subFormValid = false
				} else {
					this.subFormValid = true
				}
			},
			computedSubForm: function(data, index) {
				if (typeof data === 'number') {
					return data
				} else if (typeof this.value === 'object' && this.value instanceof Array && this.value[index]) {
					return this.value[index]
				} else {
					return 0
				}
			},
			mergeSubForm: function(list, pname, name, value) {
				switch(name) {
					case 'top': list[0] = value; break;
					case 'right': list[1] = value; break;
					case 'bottom': list[2] = value; break;
					case 'left': list[3] = value; break;
				}
				var resVal
				var theSame = true
				for (var i = 1; i < list.length; i++) {
					if (list[i] != list[i-1]) {
						theSame = false
					}
				}
				if (theSame) {
					resVal = list[0]
				} else {
					resVal = list
				}
				return {
					name: pname,
					value: resVal
				}
			}
		},
		computed: {
			isValueNumber() {
				if (typeof this.value === 'number') {
					return true
				} else {
					return false
				}
			},
			valueStr() {
				if (typeof this.value === 'object' && this.value instanceof Array && this.value.length) {
					return this.value.join(' ')
				} else {
					return ''
				}
			},
			formTop() {
				return this.computedSubForm(this.value, 0)
			},
			formRight() {
				return this.computedSubForm(this.value, 1)
			},
			formBottom() {
				return this.computedSubForm(this.value, 2)
			},
			formLeft() {
				return this.computedSubForm(this.value, 3)
			}
		},
		watch: {

		}
	}
</script>

<style scoped>
	.more-input{
		width:20px;
		height:20px;
		background-image:url('../../src/img/icon-more.png');
		background-size:100% 100%;
		position:absolute;
		right:55px;
		top:10px;
		cursor:pointer;
	}
	.more-input.close{
		transform:rotate(180deg);
	}
	.sub-form{
		position:absolute;
		padding:10px;
		top:0;
		right:-105px;
		width:130px;
		background-color:#f0f0f0;
		border-radius:5px;
		z-index:10;
	}
	.sub-form:before{
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
	.sub-form.hidden{
		display:none;
	}
</style>
