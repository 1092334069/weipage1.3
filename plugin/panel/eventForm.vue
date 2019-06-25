<template>
	<div>
		<div class="form-list">
			<div class="form-lable">事件列表：</div>
			<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.eventList" @click="selectEvent(index)">{{index+1}}</div>
			<div class="add-module" @click="addEvent"></div>
		</div>
		<div class="sub-form-list" v-if="formData.eventList && formData.eventList.length">
			<hr/>
			<template v-for="(item,index) in formData.eventList" v-if="formData.selectIndex === index">
				<div class="form">
					<v-select lable="事件类型" :options="eventTypeList" :value="item.type" name="type" @formChange="eventChange"></v-select>
				</div>
			</template>
			<hr/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "panelEventForm",
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
				eventTypeList: [{
					label: '普通事件',
					value: 'normal'
				},{
					label: '接口事件',
					value: 'interface'
				}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'event'
				this.$emit('form-change', res)
			},
			parseClass: function(index) {
				if (index === this.formData.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectEvent: function(index) {
				this.formChange({
					name: 'selectIndex',
					value: index
				})
			},
			addEvent: function() {
				const eventList = this.formData.eventList
				eventList.push({
					type: 'normal'
				})
				this.formChange({
					name: 'eventList',
					value: eventList
				})
				this.formChange({
					name: 'selectIndex',
					value: eventList.length - 1
				})
			},
			eventChange: function(res) {
				const eventList = this.formData.eventList
				eventList[this.formData.selectIndex][res.name] = res.value
				this.formChange({
					name: 'eventList',
					value: eventList
				})
			}
		}
	}
</script>

<style scoped>
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
		width:85px;
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
	.sub-form-list{
		background-color:#f0f0f0;
		margin-left:80px;
	}
</style>