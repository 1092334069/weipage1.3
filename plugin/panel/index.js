import panelView from './view.vue'
import panelBaseForm from './baseForm.vue'
import panelStyleForm from './styleForm.vue'
import panelEventForm from './eventForm.vue'

panelView.install = function(Vue){
	Vue.component(panelView.name, panelView)
}

panelBaseForm.install = function(Vue) {
	Vue.component(panelBaseForm.name, panelBaseForm)
}

panelStyleForm.install = function(Vue) {
	Vue.component(panelStyleForm.name, panelStyleForm)
}

panelEventForm.install = function(Vue) {
	Vue.component(panelEventForm.name, panelEventForm)
}

export default {
	panelView,
	panelBaseForm,
	panelStyleForm,
	panelEventForm
}