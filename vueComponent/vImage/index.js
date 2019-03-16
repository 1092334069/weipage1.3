import vImage from './vImage.vue'

vImage.install = function(Vue){
	Vue.component(vImage.name,vImage);
}

export default {
	vImage
}
