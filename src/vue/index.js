import pluginTree from './pluginTree.vue'
import weipageForm from './weipageForm.vue'

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

weipageForm.install = function(Vue) {
	Vue.component(weipageForm.name, weipageForm)
}

Vue.use(pluginTree)
Vue.use(weipageForm)
