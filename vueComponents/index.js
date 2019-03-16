import vStyle from './vStyle'

let result = {}
let pluginList = [vStyle]

for (let i = 0; i < pluginList.length; i++) {
	for(let key in pluginList[i]){
		result[key] = pluginList[i][key]
	}
}

for (let key in result) {
	Vue.use(result[key])
}

export default result
