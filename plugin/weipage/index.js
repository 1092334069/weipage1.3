import weipageBaseForm from './baseForm.vue'
import weipageScrollForm from './scrollForm.vue'
import weipageCountForm from './countForm.vue'

weipageBaseForm.install = function(Vue) {
	Vue.component(weipageBaseForm.name, weipageBaseForm)
}

weipageScrollForm.install = function(Vue) {
	Vue.component(weipageScrollForm.name, weipageScrollForm)
}

weipageCountForm.install = function(Vue) {
	Vue.component(weipageCountForm.name, weipageCountForm)
}

export default {
	weipageBaseForm,
	weipageScrollForm,
	weipageCountForm
}