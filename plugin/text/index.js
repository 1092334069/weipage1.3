import textView from './view.vue'
import textBaseForm from './baseForm.vue'
import textStyleForm from './styleForm.vue'

textView.install = function(Vue){
	Vue.component(textView.name, textView)
}

textBaseForm.install = function(Vue) {
	Vue.component(textBaseForm.name, textBaseForm)
}

textStyleForm.install = function(Vue) {
	Vue.component(textStyleForm.name, textStyleForm)
}

export default {
	textView,
	textBaseForm,
	textStyleForm
}