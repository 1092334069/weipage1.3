import common from './common'
import form from './form'
import image from './image'
import panel from './panel'
import text from './text'

let result = {}
let pluginList = [common,form,image,panel,text]

for (let i = 0; i < pluginList.length; i++) {
	for(let key in pluginList[i]){
		result[key] = pluginList[i][key]
	}
}

for (let key in result) {
	Vue.use(result[key])
}

export default result