import styleForm from './styleForm.vue'

styleForm.install = function(Vue){
	Vue.component(styleForm.name,styleForm);
}

export default {
	styleForm
}