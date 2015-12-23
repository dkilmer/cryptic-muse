var http = require('http');
var fs = require('fs');
var anagram = require('./anagram');
var deletion = require('./deletion');
var hidden = require('./hidden');
var wildcard = require('./wildcard');

//Lets define a port we want to listen to
const PORT=3000; 

var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};

function handleStatic(req, res) {
	var url = (req.url === '/') ? '/index.html' : req.url;
	var filename = __dirname + '/dist' + url;
	//console.log('-=-= looking for '+filename);
	fs.exists(filename, function(exists) {
		if(!exists) {
			res.statusCode = 404;
			res.end('Not found');
			return;
		}
		var parts = filename.split("/");
		var extParts = parts[parts.length-1].split(".");
		var ext = extParts[extParts.length-1];
		var mimeType = mimeTypes[ext.toLowerCase()];
		res.writeHead(200, {'Content-Type': mimeType});

		var fileStream = fs.createReadStream(filename, {encoding: 'utf-8'});
		fileStream.pipe(res);
	});	
}

//We need a function which handles requests and send response
function handleRequest(req, res) {
	//res.end('It Works!! Path Hit: ' + req.url);
	res.writeHead(200, {'Content-Type': 'text/event-stream', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
	//res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(req.url);
	var cmds = req.url.slice(1).split('/');
	if (cmds.length == 2) {
		var search; 
		switch (cmds[0]) {
			case 'anagram':
				search = anagram.search;
				break;
			case 'deletion':
				search = deletion.search;
				break;
			case 'hidden':
				search = hidden.search;
				break;
			case 'wildcard':
				search = wildcard.search;
				break;
			default: {
				handleStatic(req, res);
				return;
			}
		}
		search(cmds[1], function(err, results) {
			res.end(JSON.stringify(results));
		});
	} else {
		handleStatic(req, res);
	}
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});
