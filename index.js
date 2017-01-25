var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express = require('express')
var app = express()

app.get('/', function (req, res) {
	res.send(JSON.stringify({}))
})

app.get('/sync', function (req, res) {
	res.send(JSON.stringify({}))
})

app.listen(server_port, function () {
	console.log("Listening on " + server_ip_address + ", port " + server_port)
})