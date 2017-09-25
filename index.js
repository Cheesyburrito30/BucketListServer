let express = require('express')
let http = require('http')
let bodyParser = require ('body-parser')
let app = express()
let router = require('./router')
let mongoose = require('mongoose')
let cors = require('cors')

//DB connection
mongoose.connect('mongodb://localhost/bucket', {
	useMongoClient: true
})

//middleware
app.use(cors())
app.use(bodyParser.json({type: '*/*'}))
router(app);
let port = process.env.PORT || 3000
let server = http.createServer(app)

server.listen(port)
console.log('Listening on ' + port)
