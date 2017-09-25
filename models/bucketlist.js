const mongoose = require('mongoose')
const Schema = mongoose.Schema

let BucketListSchema = new Schema({
	title: {
		type: String,
		default: ""
	},
	topic: {
		type: String,
		default: ""
	},
	url: {
		type: String,
		default: ""
	},
	content: {
		type: String,
		default: ""
	},
	specificUser: {
		type: String,
		default: ""
	}
})

module.exports = mongoose.model('BucketList', BucketListSchema)