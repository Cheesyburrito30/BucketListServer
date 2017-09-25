let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt-nodejs')
let userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true //mongo doesn't know difference between uppercase and lowercase.
	},					//if user has caps on, it thinks the same input is different
	password: {			
		type: String
	}
})
userSchema.pre('save', function(next){
	let user = this
		bcrypt.genSalt(10, function(err, salt){
			if(err){return next(err)}

			bcrypt.hash(user.password, salt, null, function(err, hash){
				if (err) {return next(err)}
				user.password = hash
				next()
			})
		})
})
userSchema.methods.comparePassword = function(candidatePassword, callback){
		//'this.password' is the hashed and salted pw
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
			//if error, return callback with error
		if(err){return callback(err)}
			//else call the callback
		callback(null, isMatch)
	})
}
let model = mongoose.model('user', userSchema)
module.exports = model