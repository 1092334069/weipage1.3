<template>
	<div>
		<v-select v-if="type === 'select'" :lable="lable" :options="inputOptions" :value="value.data" @formChange="changeValue"></v-select>
		<v-text v-else :lable="lable" :value="value.data" @formChange="changeValue"></v-text>
		<v-select :lableWidth="sourceLableWidth" :options="sourceOptions" :value="value.source" @formChange="changeSource"></v-select>
	</div>
</template>

<script>
	export default {
		name: "vInputSource",
		props: {
			name: {
				type: String,
				default: ''
			},
			lable: {
				type: String,
				default: ''
			},
			value: {
				type: Object,
				default: function() {
					return {
						data: '',
						source: ''
					}
				}
			},
			sourceOptions: {
				type: Array,
				default: function() {
					return []
				}
			},
			type: {
				type: String,
				default: 'text'
			},
			inputOptions: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
				sourceLableWidth: 0
		    }
		},
		methods: {
			formChange: function(res) {
				this.$emit('formChange', res)
			},
			changeValue: function(res) {
				var r = {
					name: this.name,
					value: {
						data: res.value,
						source: this.value.source
					}
				}
				this.formChange(r)
			},
			changeSource: function(res) {
				var r = {
					name: this.name,
					value: {
						data: this.value.data,
						source: res.value
					}
				}
				this.$emit('sourceChange', r)
			}
		}
	}
</script>