import formView from './form/mobile.vue'
import imageView from './image/mobile.vue'
import panelView from './panel/mobile.vue'
import textView from './text/mobile.vue'

formView.install = function(Vue){
	Vue.component(formView.name, formView)
}

imageView.install = function(Vue){
	Vue.component(imageView.name, imageView)
}

panelView.install = function(Vue){
	Vue.component(panelView.name, panelView)
}

textView.install = function(Vue){
	Vue.component(textView.name, textView)
}

const pluginList = [formView,imageView,panelView,textView]

for (let key in pluginList) {
	Vue.use(pluginList[key])
}
