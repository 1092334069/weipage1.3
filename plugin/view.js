import formView from './form/view.vue'
import imageView from './image/view.vue'
import panelView from './panel/view.vue'
import textView from './text/view.vue'

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
