var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express = require('express')
var app = express()
var exec = require('child_process').exec;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){
		callback(stdout)
	})
}

app.get('/', function (req, res) {
	res.send(JSON.stringify({}))
})

app.post('/sync', function (req, res) {
	console.log(req.body)
	execute('./connect.sh',console.log)
	res.send(JSON.stringify({}))
})

app.listen(server_port, function () {
	console.log("Listening on " + server_ip_address + ", port " + server_port)
})