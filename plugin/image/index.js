import imageView from './view.vue'
import imageBaseForm from './baseForm.vue'
import imageStyleForm from './styleForm.vue'

imageView.install = function(Vue){
	Vue.component(imageView.name, imageView);
}

imageBaseForm.install = function(Vue) {
	Vue.component(imageBaseForm.name, imageBaseForm)
}

imageStyleForm.install = function(Vue) {
	Vue.component(imageStyleForm.name, imageStyleForm)
}

export default {
	imageView,
	imageBaseForm,
	imageStyleForm
}
