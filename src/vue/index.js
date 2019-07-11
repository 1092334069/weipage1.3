import formTree from './formTree.vue'
import pluginTree from './pluginTree.vue'
import interfaceTree from './interfaceTree.vue'
import interfaceChildTree from './interfaceChildTree.vue'

formTree.install = function(Vue) {
	Vue.component(formTree.name, formTree)
}

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

interfaceTree.install = function(Vue) {
	Vue.component(interfaceTree.name, interfaceTree)
}

interfaceChildTree.install = function(Vue) {
	Vue.component(interfaceChildTree.name, interfaceChildTree)
}

Vue.use(formTree)
Vue.use(pluginTree)
Vue.use(interfaceTree)
Vue.use(interfaceChildTree)
