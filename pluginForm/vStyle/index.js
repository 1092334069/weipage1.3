import vStyle from './vStyle.vue'

vStyle.install = function(Vue){
	Vue.component(vStyle.name,vStyle);
}

export default {
	vStyle
}