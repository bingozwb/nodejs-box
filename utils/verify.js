var jwt = require('jsonwebtoken')

var signtoken = function(obj){
	return jwt.sign(obj, ENVConfig.jwtsecret)
}

var verifytoken = function(token){
	return new Promise((resolve, reject)=>{
		jwt.verify(token, ENVConfig.jwtsecret, function(err,decoded){
			if(err){
				resolve(null)
			}
			else {
				resolve(decoded)
			}
		})
	})
}

var ismail=function(mail){
	var filter = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
	if (filter.test(mail)){
		return true
	}
	else {
		return false
	}
}

var isphone = function(phone){
	if (String(phone).length == 11) {
		return true
	}
	else {
		return false
	}
}

module.exports = {
	signtoken:signtoken,
	verifytoken:verifytoken,
	ismail:ismail,
	isphone:isphone
}
