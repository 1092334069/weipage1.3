import panelView from './view.vue'
import panelBaseForm from './baseForm.vue'
import panelStyleForm from './styleForm.vue'

panelView.install = function(Vue){
	Vue.component(panelView.name, panelView)
}

panelBaseForm.install = function(Vue) {
	Vue.component(panelBaseForm.name, panelBaseForm)
}

panelStyleForm.install = function(Vue) {
	Vue.component(panelStyleForm.name, panelStyleForm)
}

export default {
	panelView,
	panelBaseForm,
	panelStyleForm
}