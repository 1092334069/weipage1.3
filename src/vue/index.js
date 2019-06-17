import pluginTree from './pluginTree.vue'
import interfaceTree from './interfaceTree.vue'
import interfaceChildTree from './interfaceChildTree.vue'
import weipageForm from './weipageForm.vue'

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

interfaceTree.install = function(Vue) {
	Vue.component(interfaceTree.name, interfaceTree)
}

interfaceChildTree.install = function(Vue) {
	Vue.component(interfaceChildTree.name, interfaceChildTree)
}

weipageForm.install = function(Vue) {
	Vue.component(weipageForm.name, weipageForm)
}

Vue.use(pluginTree)
Vue.use(interfaceTree)
Vue.use(interfaceChildTree)
Vue.use(weipageForm)
