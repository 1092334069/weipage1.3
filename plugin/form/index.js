import formView from './view.vue'
import formBaseForm from './baseForm.vue'
import formStyleForm from './styleForm.vue'

formView.install = function(Vue){
	Vue.component(formView.name, formView)
}

formBaseForm.install = function(Vue) {
	Vue.component(formBaseForm.name, formBaseForm)
}

formStyleForm.install = function(Vue) {
	Vue.component(formStyleForm.name, formStyleForm)
}

export default {
	formView,
	formBaseForm,
	formStyleForm
}
