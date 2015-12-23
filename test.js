var Word = require('./word').Word;
var Combos = require('./combos');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + "/data/dict.db");

var s = "/something/someother";
console.log(s.split("/"));

/*
var w = new Word("Something_Long");
console.log(JSON.stringify(w));

var tl = Combos.combos(5, 2);
console.log(tl);
*/

/*
function doQuery(callback) {
	var results = [];
	var sql = "select w_text from words limit 10";
	db.each(sql, function(err, row) {
		if (err) {
			callback(err);
			return;
		}
		results.push(row.w_text);
	}, function(err, rowCount) {
		console.log('rows count: '+rowCount);	
		callback(null, results);
	});
}

doQuery(function (err, results) {
	if (err) {
		console.log("ERROR: "+err);
		return;
	}
	console.log(results);
});
*/