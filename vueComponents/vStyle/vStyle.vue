<template>
	<div>
		<div class="form-group" @click="triggerForm('shape')">
			<span>形状</span>
			<span class="form-trigger" :class="{close:formValid.shape}"></span>
		</div>
		<div v-if="formValid.shape">
			<div class="form">
				<v-number lable="宽度" :value="formData.shape.width" name="shape.width" @formChange="formChange"></v-number>
			</div>
			<div class="form">
				<v-number lable="高度" :value="formData.shape.height" name="shape.height" @formChange="formChange"></v-number>
			</div>
			<div class="form">
				<v-text v-if="isMarginStr" lable="外边距" :value="formData.shape.margin" :isReadOnly="isReadOnly" name="shape.margin" @formChange="formChange"></v-text>
				<v-number v-else lable="外边距" :value="formData.shape.margin" name="shape.margin" @formChange="formChange"></v-number>
				<div class="more-input" :class="{close:subFormValid.margin}" @click="triggerSubForm('margin')"></div>
				<div class="sub-form" v-if="subFormValid.margin">
					<v-number lable="上" size="s" :lableWidth="lableWidth" :value="marginTop" pname="shape.margin" name="top" @formChange="formChange"></v-number>
					<v-number lable="右" size="s" :lableWidth="lableWidth" :value="marginRight" pname="shape.margin" name="right" @formChange="formChange"></v-number>
					<v-number lable="下" size="s" :lableWidth="lableWidth" :value="marginBottom" pname="shape.margin" name="bottom" @formChange="formChange"></v-number>
					<v-number lable="左" size="s" :lableWidth="lableWidth" :value="marginLeft" pname="shape.margin" name="left" @formChange="formChange"></v-number>
				</div>
			</div>
			<div class="form">
				<v-text v-if="isPaddingStr" lable="内边距" :value="formData.shape.padding" :isReadOnly="isReadOnly" name="shape.padding" @formChange="formChange"></v-text>
				<v-number v-else lable="内边距" :value="formData.shape.padding" name="shape.padding" @formChange="formChange"></v-number>
				<div class="more-input" :class="{close:subFormValid.padding}" @click="triggerSubForm('padding')"></div>
				<div class="sub-form" v-if="subFormValid.padding">
					<v-number lable="上" size="s" :lableWidth="lableWidth" :value="paddingTop" pname="shape.padding" name="top" @formChange="formChange"></v-number>
					<v-number lable="右" size="s" :lableWidth="lableWidth" :value="paddingRight" pname="shape.padding" name="right" @formChange="formChange"></v-number >
					<v-number lable="下" size="s" :lableWidth="lableWidth" :value="paddingBottom" pname="shape.padding" name="bottom" @formChange="formChange"></v-number>
					<v-number lable="左" size="s" :lableWidth="lableWidth" :value="paddingLeft" pname="shape.padding" name="left" @formChange="formChange"></v-number>
				</div>
			</div>
			<div class="form">
				<v-text v-if="isBorderRadiusStr" lable="圆角" :value="formData.shape.borderRadius" :isReadOnly="isReadOnly" name="shape.borderRadius" @formChange="formChange"></v-text>
				<v-number v-else lable="圆角" :value="formData.shape.borderRadius" name="shape.borderRadius" @formChange="formChange"></v-number>
				<div class="more-input" :class="{close:subFormValid.borderRadius}" @click="triggerSubForm('borderRadius')"></div>
				<div class="sub-form" v-if="subFormValid.borderRadius">
					<v-number lable="上" size="s" :lableWidth="lableWidth" :value="borderRadiusTop" pname="shape.borderRadius" name="top" @formChange="formChange"></v-number>
					<v-number lable="右" size="s" :lableWidth="lableWidth" :value="borderRadiusRight" pname="shape.borderRadius" name="right" @formChange="formChange"></v-number>
					<v-number lable="下" size="s" :lableWidth="lableWidth" :value="borderRadiusBottom" pname="shape.borderRadius" name="bottom" @formChange="formChange"></v-number>
					<v-number lable="左" size="s" :lableWidth="lableWidth" :value="borderRadiusLeft" pname="shape.borderRadius" name="left" @formChange="formChange"></v-number>
				</div>
			</div>
			<div class="form">
				<v-number lable="旋转" type="number" :value="formData.shape.transformRotate" name="shape.transformRotate" @formChange="formChange"></v-number>
			</div>
		</div>
		<div class="form-group" @click="triggerForm('border')">
			<span>边框</span>
			<span class="form-trigger" :class="{close:formValid.border}"></span>
		</div>
		<div v-if="formValid.border">
			<div class="form">
				<v-radio lable="显示边框" :options="borderDisplayOptions" :value="formData.border.display" name="border.display" @formChange="formChange"></v-radio>
			</div>
			<div v-if="formData.border.display==='block'">
				<div class="form">
					<v-select lable="样式" :options="borderStyleOptions" :value="formData.border.style" name="border.style" @formChange="formChange"></v-select>
				</div>
				<div class="form">
					<v-number lable="尺寸" type="number" :value="formData.border.width" name="border.width" @formChange="formChange"></v-number>
				</div>
				<div class="form">
					<v-color lable="颜色" type="color" :value="formData.border.color" name="border.color" @formChange="formChange"></v-color>
				</div>
			</div>
		</div>
		<div class="form-group" @click="triggerForm('fill')">
			<span>填充</span>
			<span class="form-trigger" :class="{close:formValid.fill}"></span>
		</div>
		<div v-if="formValid.fill">
			<div class="form">
				<v-color lable="颜色" type="color" :value="formData.fill.color" name="fill.color" @formChange="formChange"></v-color>
			</div>
			<div class="form">
				<v-image lable="图片" :value="formData.fill.image" name="fill.image" @formChange="formChange"></v-image>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "vStyle",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
		    return {
		    	lableWidth: 30,
		    	formValid: {
		    		shape: false,
		    		border: false,
		    		fill: false
		    	},
		    	subFormValid: {
		    		margin: false,
		    		padding: false,
		    		borderRadius: false
		    	},
		    	borderDisplayOptions: [{
		    		label: '是',
		    		value: 'block'
		    	},{
		    		label: '否',
		    		value: 'none'
		    	}],
		    	borderStyleOptions: [{
		    		label: '实线',
		    		value: 'solid'
		    	},{
		    		label: '虚线',
		    		value: 'dashed'
		    	},{
		    		label: '点线',
		    		value: 'dotted'
		    	}],
		    	isReadOnly: true
		    }
		},
		methods: {
			formChange: function(res) {
				var result
				if (res.pname) {
					var sList = []
					switch(res.pname) {
						case 'shape.margin': sList = [this.marginTop, this.marginRight, this.marginBottom, this.marginLeft]; break;
						case 'shape.padding': sList = [this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft]; break;
						case 'shape.borderRadius': sList = [this.borderRadiusTop, this.borderRadiusRight, this.borderRadiusBottom, this.borderRadiusLeft]; break;
					}
					if (sList.length) {
						result = this.mergeSubForm(sList, res.pname, res.name, res.value)
					}
				} else{
					result = res
				}
				result['pname'] = 'style'
				this.$emit('form-change', result)
			},
			triggerForm: function(key) {
				if (this.formValid[key]) {
					this.formValid[key] = false
				} else {
					this.formValid[key] = true
				}
			},
			triggerSubForm: function(key) {
				if (this.subFormValid[key]) {
					this.subFormValid[key] = false
				} else {
					this.subFormValid[key] = true
				}
			},
			computedSubForm: function(data, index) {
				if (typeof data === 'string' && data !== '') {
					var dataList = data.split(' ')
					if (dataList && dataList.length > index) {
						return parseFloat(dataList[index])
					} else {
						return 0
					}
				}else if (typeof data === 'number') {
					return data
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
					resVal = list.join(' ')
				}
				return {
					name: pname,
					value: resVal
				}
			}
		},
		computed: {
			isMarginStr() {
				if (typeof this.formData.shape.margin === 'string') {
					return true
				} else {
					return false
				}
			},
			marginTop() {
				return this.computedSubForm(this.formData.shape.margin, 0)
			},
			marginRight() {
				return this.computedSubForm(this.formData.shape.margin, 1)
			},
			marginBottom() {
				return this.computedSubForm(this.formData.shape.margin, 2)
			},
			marginLeft() {
				return this.computedSubForm(this.formData.shape.margin, 3)
			},
			isPaddingStr() {
				if (typeof this.formData.shape.padding === 'string') {
					return true
				} else {
					return false
				}
			},
			paddingTop() {
				return this.computedSubForm(this.formData.shape.padding, 0)
			},
			paddingRight() {
				return this.computedSubForm(this.formData.shape.padding, 1)
			},
			paddingBottom() {
				return this.computedSubForm(this.formData.shape.padding, 2)
			},
			paddingLeft() {
				return this.computedSubForm(this.formData.shape.padding, 3)
			},
			isBorderRadiusStr() {
				if (typeof this.formData.shape.borderRadius === 'string') {
					return true
				} else {
					return false
				}
			},
			borderRadiusTop() {
				return this.computedSubForm(this.formData.shape.borderRadius, 0)
			},
			borderRadiusRight() {
				return this.computedSubForm(this.formData.shape.borderRadius, 1)
			},
			borderRadiusBottom() {
				return this.computedSubForm(this.formData.shape.borderRadius, 2)
			},
			borderRadiusLeft() {
				return this.computedSubForm(this.formData.shape.borderRadius, 3)
			}
		},
		watch: {

		}
	}
</script>

<style>
	.form-group{
		padding:10px;
		background-color:#f2f2f2;
		font-size:16px;
		position:relative;
		margin-bottom:5px;
		cursor:pointer;
	}
	.form-group .form-trigger{
		width:20px;
		height:20px;
		background-image:url('../../src/img/icon-more.png');
		background-size:100% 100%;
		position:absolute;
		right:10px;
		top:6px;
		display:inline-block;
		cursor:pointer;
	}
	.form-group .form-trigger.close{
		transform:rotate(90deg);
	}
	.form{
		position:relative;
		width:300px;
		margin:5px 0;
	}
	.form .more-input{
		width:20px;
		height:20px;
		background-image:url('../../src/img/icon-more.png');
		background-size:100% 100%;
		position:absolute;
		right:55px;
		top:4px;
		cursor:pointer;
	}
	.form .more-input.close{
		transform:rotate(180deg);
	}
	.sub-form{
		position:absolute;
		padding:10px;
		top:0;
		right:-105px;
		width:120px;
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
		top:4px;
		left:-20px;
	}
	.sub-form.hidden{
		display:none;
	}
</style>