const crypto = require('crypto')
const secretKeyConfig = require('../config/secretKeyConfig')

function encrypt(data) {
    try {
    	const cipher = crypto.createCipher('aes192', secretKeyConfig.aesKey)
	    let crypted = cipher.update(data, 'utf8', 'hex')
	    crypted += cipher.final('hex')
	    return crypted
    } catch (e) {
    	return false
    }
    
}

function decrypt(data) {
	try {
	    const decipher = crypto.createDecipher('aes192', secretKeyConfig.aesKey);
	    let decrypted = decipher.update(data, 'hex', 'utf8')
	    decrypted += decipher.final('utf8')
	    return decrypted
	} catch (e) {
		return false
	}
}

module.exports = {
	encrypt,
	decrypt
}