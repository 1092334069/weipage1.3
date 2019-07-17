<template>
	<div class="plugin-form">
		<div class="form">
			<v-text lable="名称" :value="formData.name" size="l" name="name" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-text lable="描述" :value="formData.describes" size="l" name="describes" @formChange="weipageChange"></v-text>
		</div>
		<div class="form">
			<v-image lable="图片" :value="formData.cover" name="cover" @formChange="weipageChange" @selectImage="selectImage"></v-image>
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
		name: "weipageBaseForm",
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
			selectImage: function(res) {
				this.$emit('select-image', res)
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
	.form{
		width:300px;
	}
	.form.size-l{
		width:500px;
	}
</style>