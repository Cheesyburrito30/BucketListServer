//gatekeeper/traffic cop for app
let Auth = require('./controllers/auth')
let BucketList = require('./controllers/bucketlistcontroller')
let passportService = require('./services/passport')
let passport = require('passport')
let requireAuth = passport.authenticate('jwt', {session: false})
let requireSignin = passport.authenticate('local', {session: false})
 
module.exports = function(app) {

	app.post('/signup', Auth.signup)
	app.post('/signin', requireSignin, Auth.signin)
	app.post('/newitem', requireAuth, BucketList.addBucketList)
	app.get('/items', requireAuth, BucketList.fetchBucketLists)
	app.get('/items/:id', requireAuth, BucketList.fetchBucketList);
	app.put('/items/:id', requireAuth, BucketList.updateBucketList);
	app.delete('/items/:id', requireAuth, BucketList.deleteBucketList);
} 