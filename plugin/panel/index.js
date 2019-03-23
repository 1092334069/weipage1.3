import view from './view.vue'
import styleForm from './styleForm.vue'

view.install = function(Vue){
	Vue.component(view.name,view);
}

styleForm.install = function(Vue){
	Vue.component(styleForm.name,styleForm);
}

export default {
	view,
	styleForm
}