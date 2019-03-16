import vSelect from './vSelect.vue'

vSelect.install = function(Vue){
	Vue.component(vSelect.name,vSelect);
}

export default {
	vSelect
}