import pluginTree from './pluginTree.vue'
import pluginTreeList from './pluginTreeList.vue'

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

pluginTreeList.install = function(Vue) {
	Vue.component(pluginTreeList.name, pluginTreeList)
}

Vue.use(pluginTree)
Vue.use(pluginTreeList)
