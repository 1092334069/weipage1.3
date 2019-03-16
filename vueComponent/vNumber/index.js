import vNumber from './vNumber.vue'

vNumber.install = function(Vue){
	Vue.component(vNumber.name,vNumber);
}

export default {
	vNumber
}
