import view from './view.vue'
import baseForm from './baseForm.vue'
import styleForm from './styleForm.vue'

view.install = function(Vue){
	Vue.component(view.name, view);
}

baseForm.install = function(Vue) {
	Vue.component(baseForm.name, baseForm)
}

styleForm.install = function(Vue) {
	Vue.component(styleForm.name, styleForm)
}

export default {
	view,
	baseForm,
	styleForm
}