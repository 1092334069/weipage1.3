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
				<v-four-sides lable="外边距" :value="formData.shape.margin" name="shape.margin" @formChange="formChange"></v-four-sides>
			</div>
			<div class="form">
				<v-four-sides lable="内边距" :value="formData.shape.padding" name="shape.padding" @formChange="formChange"></v-four-sides>
			</div>
			<div class="form">
				<v-four-sides lable="内边距" :value="formData.shape.borderRadius" name="shape.borderRadius" @formChange="formChange"></v-four-sides>
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
		<div class="form-group" @click="triggerForm('location')">
			<span>定位</span>
			<span class="form-trigger" :class="{close:formValid.location}"></span>
		</div>
		<div v-if="formValid.location">
			<div class="form">
				<v-radio lable="是否定位" :options="locationPositionOptions" :value="formData.location.position" name="location.position" @formChange="formChange"></v-radio>
			</div>
			<div class="form" v-if="formData.location.position==='absolute'">
				<v-number lable="横向" :value="formData.location.left" name="location.left" @formChange="formChange"></v-number>
			</div>
			<div class="form" v-if="formData.location.position==='absolute'">
				<v-number lable="纵向" :value="formData.location.top" name="location.top" @formChange="formChange"></v-number>
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
		name: "panelStyleForm",
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
		    	isReadOnly: true,
		    	formValid: {
		    		shape: true,
		    		border: false,
		    		location: false,
		    		fill: false
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
		    	locationPositionOptions: [{
		    		label: '否',
		    		value: 'relative'
		    	},{
		    		label: '是',
		    		value: 'absolute'
		    	}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'style'
				this.$emit('form-change', res)
			},
			triggerForm: function(key) {
				if (this.formValid[key]) {
					this.formValid[key] = false
				} else {
					this.formValid[key] = true
				}
			}
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
</style>