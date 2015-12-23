var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var Word = require('./word').Word;
var combos = require('./combos').combos;
var db = new sqlite3.Database(__dirname + "/data/dict.db");


function wordEndsWith(s, callback) {
	db.all("select w_strip from words where w_strip like '%"+s+"' limit 1", function(err, rows) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, ((rows) && (rows.length > 0)));
	}); 
}

function wordStartsWith(s, callback) {
	db.all("select w_strip from words where w_strip like '"+s+"%' limit 1", function(err, rows) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, ((rows) && (rows.length > 0)));
	}); 
}

function isWord(s, callback) {
	if ((s === 'a') || (s === 'i')) {
		callback(null, true);
		return;
	}
	if (s.length == 1) {
		callback(false);
		return;
	}
	db.all("select w_strip from words where w_strip = '"+s+"' limit 1", function(err, rows) {
		if (err) {
			console.log('isWord returning error for '+s+': '+err);
			callback(err);
			return;
		}
		callback(null, ((rows) && (rows.length > 0)));
	}); 
}

function allTrue(conds, doneCallback) {
	async.map(conds, 
		function(cond, mapCallback){
			cond.func(cond.word, mapCallback);
		},
		function(err, results) {
			if (err) {
				doneCallback(err);
				return;
			}
			for (var i=0; i<results.length; i++) {
				if (!results[i]) {
					doneCallback(null, false);
					return;
				}
			}
			doneCallback(null, true);
		}
  );
}

function find(s, queue) {
	var len = s.length - 1;
	for (var i=1; i<=len; i++) {
		var s1 = s.slice(0,i);
		var s2 = s.slice(i);
		queue.push({
			conds: [
				{word: s1, func: wordEndsWith},
				{word: s2, func: wordStartsWith}
			],
			result: ['*'+s1, s2+'*']
		});
	}
	var idxlist = combos(len, 2);
	idxlist.forEach(c => {
		var s1 = s.slice(0, c[0]);
		var s2 = s.slice(c[0], c[1]);
		var s3 = s.slice(c[1]);
		queue.push({
			conds: [
				{word: s2, func: isWord},
				{word: s1, func: wordEndsWith},
				{word: s3, func: wordStartsWith}
			],
			result: ['*'+s1, s2, s3+'*']
		});
	});
	idxlist = combos(len, 3);
	idxlist.forEach(c => {
		var s1 = s.slice(0, c[0]);
		var s2 = s.slice(c[0], c[1]);
		var s3 = s.slice(c[1], c[2]);
		var s4 = s.slice(c[2]);
		queue.push({
			conds: [
				{word: s2, func: isWord},
				{word: s3, func: isWord},
				{word: s1, func: wordEndsWith},
				{word: s4, func: wordStartsWith}
			],
			result: ['*'+s1, s2, s3, s4+'*']
		});
	});
}

function search(qry, completeCallback) {
	var word = new Word(qry);
	var hlist = [];
	
	var queue = async.queue(function (task, callback) {
		allTrue(task.conds, function(err, answer) {
			if (answer) {
				hlist.push(task.result);
			}
			callback();
		});
	}, 2);

	queue.drain = function() {
		completeCallback(null, hlist);
	}
	find(word.strip, queue);
	find(word.reverse, queue);
}

module.exports = {
	search: search
};
