import textView from './view.vue'
import textBaseForm from './baseForm.vue'

textView.install = function(Vue){
	Vue.component(textView.name, textView);
}

textBaseForm.install = function(Vue) {
	Vue.component(textBaseForm.name, textBaseForm)
}

export default {
	textView,
	textBaseForm
}