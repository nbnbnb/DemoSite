var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer(function (req, res) {
	var callbck = querystring.parse(url.parse(req.url).query).callback;
	console.log('Get a request');
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	});
	res.end(callbck + '({"name":"ZhangJin"});');
}).listen(3000);
console.log('Server is running at http://localhost:%s', 3000);
