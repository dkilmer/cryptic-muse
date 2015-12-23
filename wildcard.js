var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var Word = require('./word').Word;
var db = new sqlite3.Database(__dirname + "/data/dict.db");

function search(w, completeCallback) {
	var nw = w.toLowerCase().replace(/\?/g,'_').replace(/\*/g,'%');
	var sql = "select w_text from words where w_strip like '"+nw+"' limit 1000";
	var results = [];
	db.each(sql, function(err, row) {
		if (err) {
			completeCallback(err);
			return;
		}
		results.push([row.w_text]);
	}, function(err, rowCount) {
		completeCallback(null, results);
	}); 
}

module.exports = {
	search: search
};
