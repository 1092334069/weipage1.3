<template>
	<div class="weipage-form">
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="描述" :value="formData.describes" size="l" name="describes" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.cover" name="cover" @formChange="weipageChange"></v-image>
		</div>
		<div class="form">
			<v-text lable="英文名" :value="formData.pageName" size="l" name="pageName" @formChange="weipageChange"></v-text>
		</div>
		<div class="form-list">
			<div class="form-lable">接口：</div>
			<div class="form-item" :class="parseClass(item.interfaceId)" v-for="item in formData.interfaceList" @click="selectInterface(item.interfaceId)">{{item.name}}</div>
			<div class="add-module" @click="openInterfaceModel"></div>
		</div>
		<hr/>
		<template v-for="itf in formData.interfaceList" v-if="formData.selectInterfaceId === itf.interfaceId">
			<div class="form" v-for="item in itf.param">
				<v-number v-if="item.type=='number'" :lable="item.name" :value="item.value" size="l" :name="item.key" @formChange="interfaceChange"></v-number>
				<v-text v-else :lable="item.name" :value="item.value" size="l" :name="item.key" @formChange="interfaceChange"></v-text>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: "weipageForm",
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
		    	
		    }
		},
		methods: {
			weipageChange: function(res) {
				this.$emit('weipage-change', res)
			},
			openInterfaceModel: function() {
				this.$emit('open-interface-model','weipage')
			},
			selectInterface: function(interfaceId) {
				this.$emit('weipage-change', {
					name: 'selectInterfaceId',
					value: interfaceId
				})
			},
			interfaceChange: function(res) {
				const interfaceList = this.formData.interfaceList
				for (let i = 0; i < interfaceList.length; i++) {
					if (this.formData.selectInterfaceId === interfaceList[i].interfaceId) {
						for (let j = 0; j < interfaceList[i].param.length; j++) {
							if (interfaceList[i].param[j].key === res.name) {
								interfaceList[i].param[j].value = res.value
							}
						}
					}
				}
				this.weipageChange({
					name: 'interfaceList',
					value: interfaceList
				})
			},
			parseClass: function(interfaceId) {
				if (interfaceId === this.formData.selectInterfaceId) {
					return 'current'
				} else {
					return ''
				}
			}
		}
	}
</script>

<style scoped>
	.weipage-form{
		padding-bottom:10px;
	}
	.form{
		position:relative;
		width:300px;
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
		background-image:url('../img/icon-add.png');
		background-size:24px 24px;
		background-repeat:no-repeat;
		background-position:center;
		cursor:pointer;
		display:inline-block;
		float:left;
	}
</style>