import vColor from './vColor.vue'

vColor.install = function(Vue){
	Vue.component(vColor.name,vColor);
}

export default {
	vColor
}
