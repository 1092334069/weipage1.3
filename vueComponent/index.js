import vColor from './vColor'
import vImage from './vImage'
import vNumber from './vNumber'
import vRadio from './vRadio'
import vSelect from './vSelect'
import vText from './vText'

let result = {}
let pluginList = [vColor,vImage,vNumber,vRadio,vSelect,vText]

for (let i = 0; i < pluginList.length; i++) {
	for(let key in pluginList[i]){
		result[key] = pluginList[i][key]
	}
}

for (let key in result) {
	Vue.use(result[key])
}

export default result
