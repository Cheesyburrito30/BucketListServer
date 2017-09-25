//controller that handles the authentication when a user is signing up or out
let User = require('../models/user.js')
let jwt = require('jwt-simple')
let config = require('../config')

//giving a token to the user for future authorization
function createUserToken(user){
	let timestamp = new Date().getTime()
				//jwt.encode(payload, secret)  payload will be accessed later
	return jwt.encode({ sub: user.id, iat: timestamp },	//attaches the encrypted token to userID
		config.secret)				//^issued at		//because the ID will never change
				// payload will be the token, and when decoded will be an object with sub andiat
				// 'payload.sub' will return the user's ID
}														
exports.signup = function(req, res, next){
	let email = req.body.email
	let password = req.body.password
	if(!email || !password){
		return res.status(418).send({error: "You must provide email and pw."}) //validation
	}
	User.findOne({email: email}, function(err, existingUser){
			if(err){				//handles errors
				return next(err)
			}
			if(existingUser){ 		//handles user that already exists
				return res.status(418).send(err)	//or '.send("email is in use")'
			}
		let user = new User({
			email: email,
			password: password
		})

		user.save(function(err){
			if(err){return next(err)}
			res.json({ token: createUserToken(user)})
		})

	})
}
exports.signin = function(req, res, next){
	res.send({token: createUserToken(req.user)})
}