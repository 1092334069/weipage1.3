import vText from './vText.vue'

vText.install = function(Vue){
	Vue.component(vText.name,vText);
}

export default {
	vText
}
