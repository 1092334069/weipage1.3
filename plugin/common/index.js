import actionForm from './actionForm.vue'

actionForm.install = function(Vue) {
	Vue.component(actionForm.name, actionForm)
}

export default {
	actionForm
}
