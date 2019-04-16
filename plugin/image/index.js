import imageView from './view.vue'
import imageBaseForm from './baseForm.vue'

imageView.install = function(Vue){
	Vue.component(imageView.name, imageView);
}

imageBaseForm.install = function(Vue) {
	Vue.component(imageBaseForm.name, imageBaseForm)
}

export default {
	imageView,
	imageBaseForm
}