<template>
	<div class="base-form">
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="formChange"></v-text>
		</div>
		<div class="form-list">
			<div class="form-lable">响应：</div>
			<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.actionList" @click="selectAction(index)">{{index+1}}</div>
			<div class="add-module" @click="addAction"></div>
		</div>
		<hr/>
		<template v-for="(item,index) in formData.actionList" v-if="formData.selectActionIndex === index">
			<div class="form">
				<v-select lable="响应键" :options="actionKeyList" :value="item.key" name="key" @formChange="actionChange"></v-select>
			</div>
			<div class="form">
				<v-radio lable="响应类型" :options="actionTypeList" :value="item.type" name="type" @formChange="actionChange"></v-radio>
			</div>		
			<div class="form" v-if="item.type === 'interface'">
				<div class="action-interface">
					<span class="lable">响应值：</span>
					<div class="interface-btn" v-if="item.value" @click="openInterfaceTreeModel">{{item.value}}</div>
					<div class="interface-btn" v-else @click="openInterfaceTreeModel">点击选择接口参数</div>
				</div>
			</div>
			<div class="form" v-else>
				<v-text lable="响应值" :value="item.value" size="l" name="value" @formChange="actionChange"></v-text>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: "panelBaseForm",
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
		    	actionKeyList: [{
		    		label: '宽度',
		    		value: 'width'
		    	},{
		    		label: '高度',
		    		value: 'height'
		    	},{
		    		label: '外边距',
		    		value: 'margin'
		    	},{
		    		label: '内边距',
		    		value: 'padding'
		    	},{
		    		label: '圆角',
		    		value: 'borderRadius'
		    	},{
		    		label: '旋转',
		    		value: 'transformRotate'
		    	},{
		    		label: '边框',
		    		value: 'border'
		    	},{
		    		label: '定位',
		    		value: 'position'
		    	},{
		    		label: '颜色',
		    		value: 'backgroundColor'
		    	},{
		    		label: '图片',
		    		value: 'backgroundImage'
		    	}],
		    	actionTypeList: [{
		    		label: '接口',
		    		value: 'interface'
		    	},{
		    		label: '连接参数',
		    		value: 'url'
		    	},{
		    		label: '缓存',
		    		value: 'cookie'
		    	}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'base'
				this.$emit('form-change', res)
			},
			parseClass: function(index) {
				if (index === this.formData.selectActionIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAction: function(index) {
				this.formChange({
					name: 'selectActionIndex',
					value: index
				})
			},
			actionChange: function(res) {
				const actionList = this.formData.actionList
				actionList[this.formData.selectActionIndex][res.name] = res.value
				this.formChange({
					name: 'actionList',
					value: actionList
				})
			},
			addAction: function() {
				const actionList = this.formData.actionList
				actionList.push({
					key: 'width',
					type: 'interface',
					value: ''
				})
				this.formChange({
					name: 'actionList',
					value: actionList
				})
				this.formChange({
					name: 'selectActionIndex',
					value: actionList.length - 1
				})
			},
			openInterfaceTreeModel: function() {
				this.$emit('open-interface-tree-model')
			}
		}
	}
</script>

<style scoped>
	.base-form{
		padding-bottom:10px;
	}
	.form{
		position:relative;
		margin:5px 0;
	}
	.form-list{
		position:relative;
		overflow:hidden;
		margin:5px 0;
		padding-left:85px;
	}
	.form-list .form-lable{
		width:80px;
		display: inline-block;
	    font-size: 14px;
	    text-align: right;
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 40px;
	    line-height: 40px;
	}
	.form-item{
		padding:0 10px;
		margin-right:10px;
		border-radius:4px;
		height:40px;
		line-height:40px;
		background-color:#fff;
		display:inline-block;
		border:1px solid #fff;
		float:left;
		cursor:pointer;
	}
	.form-item.current{
		border:1px solid #138ed4;
	}
	.add-module{
		width:40px;
		height:40px;
		background-image:url('../../src/img/icon-add.png');
		background-size:24px 24px;
		background-repeat:no-repeat;
		background-position:center;
		cursor:pointer;
		display:inline-block;
		float:left;
	}
	.action-interface{
		position:relative;
		margin:5px 0;
		padding-left:85px;
	}
	.action-interface .lable{
		width:80px;
		display: inline-block;
	    font-size: 14px;
	    text-align: right;
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 40px;
	    line-height: 40px;
	}
	.action-interface .interface-btn{
		height: 36px;
	    line-height: 36px;
	    padding:0 10px;
	    border:1px solid #e5e5e5;
	    border-radius:4px;
	    cursor:pointer;
	}
</style>