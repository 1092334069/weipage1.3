<template>
	<div>
		<div class="form-group" @click="triggerForm('shape')">
			<span>形状</span>
			<span class="form-trigger" :class="{close:formValid.shape}"></span>
		</div>
		<div v-if="formValid.shape">
			<div class="form">
				<v-number lable="宽度" :value="formData.width" name="width" @formChange="formChange"></v-number>
			</div>
			<div class="form">
				<v-number lable="高度" :value="formData.height" name="height" @formChange="formChange"></v-number>
			</div>
			<div class="form">
				<v-four-sides lable="外边距" :value="formData.margin" name="margin" @formChange="formChange"></v-four-sides>
			</div>
			<div class="form">
				<v-four-sides lable="内边距" :value="formData.padding" name="padding" @formChange="formChange"></v-four-sides>
			</div>
			<div class="form">
				<v-four-sides lable="圆角" :value="formData.borderRadius" name="borderRadius" @formChange="formChange"></v-four-sides>
			</div>
			<div class="form">
				<v-number lable="旋转" :value="formData.transformRotate" name="transformRotate" @formChange="formChange"></v-number>
			</div>
			<div class="form">
				<v-radio lable="对齐" :options="textAlignOptions" :value="formData.textAlign" name="textAlign" @formChange="formChange"></v-radio>
			</div>
			<div class="form">
				<v-radio lable="状态" :options="displayOptions" :value="formData.display" name="display" @formChange="formChange"></v-radio>
			</div>
		</div>
		<div class="form-group" @click="triggerForm('border')">
			<span>边框</span>
			<span class="form-trigger" :class="{close:formValid.border}"></span>
		</div>
		<div v-if="formValid.border">
			<div class="form">
				<v-radio lable="边框状态" :options="borderDisplayOptions" :value="formData.border" name="border" @formChange="formChange"></v-radio>
			</div>
			<div v-if="formData.border==='block'">
				<div class="form">
					<v-radio lable="样式" :options="borderStyleOptions" :value="formData.borderStyle" name="borderStyle" @formChange="formChange"></v-radio>
				</div>
				<div class="form">
					<v-four-sides lable="尺寸" :value="formData.borderWidth" name="borderWidth" @formChange="formChange"></v-four-sides>
				</div>
				<div class="form">
					<v-color lable="颜色" :value="formData.borderColor" name="borderColor" @formChange="formChange"></v-color>
				</div>
			</div>
		</div>
		<div class="form-group" @click="triggerForm('location')">
			<span>定位</span>
			<span class="form-trigger" :class="{close:formValid.location}"></span>
		</div>
		<div v-if="formValid.location">
			<div class="form">
				<v-radio lable="是否定位" :options="locationPositionOptions" :value="formData.position" name="position" @formChange="formChange"></v-radio>
			</div>
			<div class="form" v-if="formData.position==='absolute'">
				<v-number lable="横向" :value="formData.left" name="left" @formChange="formChange"></v-number>
			</div>
			<div class="form" v-if="formData.position==='absolute'">
				<v-number lable="纵向" :value="formData.top" name="top" @formChange="formChange"></v-number>
			</div>
		</div>
		<div class="form-group" @click="triggerForm('fill')">
			<span>填充</span>
			<span class="form-trigger" :class="{close:formValid.fill}"></span>
		</div>
		<div v-if="formValid.fill">
			<div class="form">
				<v-color lable="颜色" :value="formData.backgroundColor" name="backgroundColor" @formChange="formChange"></v-color>
			</div>
			<div class="form">
				<v-image lable="图片" :value="formData.backgroundImage" name="backgroundImage" @selectImage="selectImage"></v-image>
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
				textAlignOptions:[{
					label: '左',
					value: 'left'
				},{
					label: '右',
					value: 'right'
				},{
					label: '中',
					value: 'center'
				}],
				displayOptions: [{
					label: '显示',
					value: 'block'
				},{
					label: '隐藏',
					value: 'none'
				}],
				borderDisplayOptions: [{
					label: '显示',
					value: 'block'
				},{
					label: '隐藏',
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
			selectImage: function(res) {
				res['pname'] = 'style'
				this.$emit('select-image', res)
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

<style scoped>
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