let BucketList = require('../models/bucketlist.js')

exports.addBucketList = function(req, res, next){
	//for postman since it won't use props
	// let title = req.body.title
	// let topic = req.body.topic
	// let url = req.body.url
	// let content = req.body.content
	// let specificUser = req.user.id

	let title = req.body.props.title
	let topic = req.body.props.topic
	let url = req.body.props.url
	let content = req.body.props.content
	let specificUser = req.user._id

	let bucketList = new BucketList({
		title: title,
		topic: topic,
		url: url,
		content: content,
		specificUser: specificUser
	});

	

	bucketList.save(function(err){
		if (err) {return next(err)}
		res.json(bucketList)
	})
}
exports.fetchBucketLists = function(req, res) {
	let specificUser = req.user._id;
	BucketList.find({specificUser: specificUser})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(err) {
			res.send(500, err.message);
		}
	);
}
exports.fetchBucketList = function(req,res) {
	let specificBucketList = req.params.id;
	BucketList.findOne({_id: specificBucketList})
	.then(
		function fetchSuccess(data) {
			res.json(data);
		},
		function fetchError(error) {
			res.json(500, err.message);
		}
	);
}

exports.deleteBucketList = function(req, res) {
	let specificBucketList = req.params.id;
	BucketList.remove({_id: specificBucketList})
	.then(
		function deleteSuccess(data) {
			res.json(data);
		},
		function deleteError(error) {
			res.json(500, err.message);
		}
	);
}

exports.updateBucketList = function(req, res) {
	let specificBucketList = req.params.id;
	BucketList.findById(specificBucketList, function(err, bucketlistUpdate) {
		if (err) {
			res.status(500, err.message)
		} else {

			bucketlistUpdate.title = req.body.props.title;
			bucketlistUpdate.topic = req.body.props.topic;
			bucketlistUpdate.url = req.body.props.url;
			bucketlistUpdate.content = req.body.props.content;

			bucketlistUpdate.save(function(err, bucketlist) {
				if (err) {
				res.status(500, err.message)
			}
			res.send(bucketlist);
			});
		};
	});
}