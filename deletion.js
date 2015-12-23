var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var Word = require('./word').Word;
var db = new sqlite3.Database(__dirname + "/data/dict.db");

function subtract(word, letter) {
	var str = [];
	var found = false;
	word.strip.split('').forEach(c => {
		if ((!found) && (c === letter)) {
			found = true;
		}	else {
			str.push(c);
		}
	});
	var nw = new Word(str.join(''));
	return nw;
}

function find(sort, callback) {
	var results = [];
	var sql = "select w_text from words where w_sort = '"+sort+"'";
	db.each(sql, function(err, row) {
		if (err) {
			callback(err);
			return;
		}
		results.push(row.w_text);
	}, function(err, rowCount) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, results);
	}); 
}

function search(qry, completeCallback) {
	var results = [];

	var queue = async.queue(function (task, callback) {
		find(task.sort, function(err, wlist) {
			if (wlist.length > 0) {
				results.push(['## subtracting '+task.letter]);
				wlist.forEach(w => {
					results.push([w]);
				});
				//results.push({subtract: task.letter, words: wlist});
			}
			callback();
		});
	}, 2);

	queue.drain = function() {
		completeCallback(null, results);
	}

	var word = new Word(qry);
	var ALPHA = "abcdefghijklmnopqrstuvwxyz";
	ALPHA.split('').forEach(c => {
		var idx = c.charCodeAt(0) - 97;
		if (word.letters[idx] > 0) {
			var nw = subtract(word, c);
			queue.push({letter: c, sort: nw.sort});
		}
	});
}

module.exports = {
	search: search
};
