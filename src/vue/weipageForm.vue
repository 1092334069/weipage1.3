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
			<v-text lable="文件名" :value="formData.pageName" size="l" name="pageName" placeholder="请输入字母" @formChange="weipageChange"></v-text>
		</div>
		<div class="form-list">
			<div class="form-lable">接口：</div>
			<div class="form-item" :class="parseClass(item.interfaceId)" v-for="item in formData.interfaceList" @click="selectInterface(item.interfaceId)">{{item.name}}</div>
			<div class="add-module" @click="openInterfaceModel"></div>
		</div>
		<div class="sub-form-list" v-if="formData.interfaceList && formData.interfaceList.length">
			<hr/>
			<template v-for="itf in formData.interfaceList" v-if="formData.selectInterfaceId === itf.interfaceId">
				<div class="delete-module" @click="deleteInterface"></div>
				<div class="form size-l" v-for="item in itf.param">
					<v-input-source :lable="item.name" :value="item.value" :name="item.key" :sourceOptions="sourceOptions" @formChange="interfaceChange"></v-input-source>
				</div>
			</template>
			<hr/>
		</div>
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
				sourceOptions: [{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'cookie'
				}]
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
			},
			deleteInterface: function() {
				this.$emit('delete-interface', this.formData.selectInterfaceId)
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
	.form.size-l{
		width:500px;
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
	.sub-form-list{
		background-color:#f0f0f0;
		margin-left:80px;
		position:relative;
	}
	.delete-module{
		width:40px;
		height:40px;
		background-image:url('../img/icon-delete.png');
		background-size:24px 24px;
		background-repeat:no-repeat;
		background-position:center;
		cursor:pointer;
		display:inline-block;
		position:absolute;
		right:0;
		top:0;
		z-index:10;
	}
</style>