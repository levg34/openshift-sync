var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express = require('express')
var app = express()
var server = require('http').createServer(app)
var bodyParser = require('body-parser')
var exec = require('child_process').exec

var map = [{name:'nodejs-chat',ssh:'588766d40c1e66f625000171@nodechat-levg34.rhcloud.com'},{name:'image-uploader',ssh:'5914202e2d5271f7e4000100@uploader-levg34.rhcloud.com'}]

function execute(command, callback){
    exec(command, function(error, stdout, stderr){
		callback(stdout)
	})
}

function getSSH(project) {
	var index = map.map(function (e) {
		return e.name
	}).indexOf(project)
	if (index!=-1) {
		return map[index].ssh
	}
}

app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send(JSON.stringify({}))
})

app.get('/ping', function (req, res) {
	res.sendFile(__dirname + '/icon.png')
})

app.post('/sync', function (req, res) {
	var body = req.body
	var project = body.repository.name
	var ssh = getSSH(project)
	if (ssh) {
		execute('./connect.sh '+ssh,console.log)
	} else {
		execute('./update',console.log)
	}
	res.send(JSON.stringify({}))
})

server.listen(server_port,server_ip_address,function () {
	console.log("Listening on " + server_ip_address + ", port " + server_port)
})