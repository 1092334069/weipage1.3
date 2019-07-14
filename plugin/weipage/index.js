import weipageBaseForm from './baseForm.vue'
import weipageScrollForm from './scrollForm.vue'

weipageBaseForm.install = function(Vue) {
	Vue.component(weipageBaseForm.name, weipageBaseForm)
}

weipageScrollForm.install = function(Vue) {
	Vue.component(weipageScrollForm.name, weipageScrollForm)
}

export default {
	weipageBaseForm,
	weipageScrollForm
}