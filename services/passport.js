let passport = require('passport')
let User = require('../models/user')
let config = require('../config')
let JwtStrategy = require('passport-jwt').Strategy 
let ExtractJwt = require('passport-jwt').ExtractJwt
let LocalStrategy = require('passport-local')
let localOptions = {usernameField: 'email'}
let localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email: email}, function(err, user){
		if(err){return done(err)}	//if err, return early with err obj
		if(!user){return done(null, false)}//not an err, just user not found
		//compare passwords - is 'password' equal to user.password?
		//compare pw from req with user's saved pw
		user.comparePassword(password, function(err, isMatch){
			
			if(err){return done(err)}	//if err, return early
			if(!isMatch){return done(null, false)}	//if not the same, it will return false and say didn't match
			return done(null, user)//if same, will call passport callback with user model
		})
		//tricky : salted the pw, and we need to somehow decode encrypted pw to normal pw
	})
	//Otherwise, call done with false
})
let jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
}
let jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	User.findById(payload.sub, function(err, user){
		if(err){return done(err, false)}
		if(user){
			done(null, user)
		} else {
			done(null, false)
		}
	})
})
passport.use(jwtLogin)
passport.use(localLogin)