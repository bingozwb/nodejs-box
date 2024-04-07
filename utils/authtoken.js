var verify = require('./verify')

module.exports = function(req, res, next){
	let token = req.session.token
	if (token){
		verify.verifytoken(token).then((data)=>{
			if(data){
				req.session.uid = data.user_id
				req.session.account = data.account
			} else {
				res.status(401)
			}
		})
	} else {
		res.status(401)
	}
	next()
}