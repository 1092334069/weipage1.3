import pluginTree from './pluginTree.vue'

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

Vue.use(pluginTree)
