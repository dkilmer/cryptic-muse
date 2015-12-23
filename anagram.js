var sqlite3 = require('sqlite3').verbose();
var CalcWord = require('./calc_word').CalcWord;
var db = new sqlite3.Database(__dirname + "/data/dict.db");

function calcStrip(w) {
	var wa = w.toLowerCase().split('');
	var nw = '';
	wa.forEach(c => {
		var ccode = c.charCodeAt(0);
		if ((ccode > 96) && (ccode < 123)) {
			nw += c;
		}
	});
	return nw;
}

function calcMask(w) {
	var mask = 0;
	w.split('').forEach(c => {
		var idx = c.charCodeAt(0) - 97;
		mask = mask | (1 << idx);
	});
	return mask;
}

function findMask(cw, callback) {
	var results = [];
	var mask = calcMask(cw.strip);
	var sql = "select w_text, w_strip from words where (w_mask | "+mask+")="+mask+
		" and w_length<="+cw.strip.length+" order by w_length DESC";
	db.each(sql, function(err, row) {
		if (err) {
			callback(err);
			return;
		}
		var ncw = new CalcWord(row.w_text, row.w_strip);
		results.push(ncw);
	}, function(err, rowCount) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, results);
	}); 
}

function find(rw, sidx, clist, rlist) {
  for (var i=sidx; i<clist.length; i++) {
    var cw = clist[i];
    if (rw.contains(cw)) {
      var nw = rw.clone();
      nw.subtract(cw);
      if (nw.empty()) {
        rlist.push(nw);
      } else {
        find(nw, i+1, clist, rlist);
      }
    }
  }
}

function search(qry, completeCallback) {
	var w = new CalcWord(qry, calcStrip(qry));
	var rlist = [];
	findMask(w, function(err, clist) {
		if (clist.length == 0) {
			completeCallback(null, rlist);
			return;	
		}
		var sidx = 0;
		while (sidx < clist.length) {
			var rw = w.clone();
			var cw = clist[sidx];
			rw.subtract(cw);
			if (rw.empty()) {
				rlist.push(rw);
			} else {
				find(rw, sidx+1, clist, rlist);
			}
			sidx++;
		}

		var results = [];
		rlist.forEach(ww => {
			results.push(ww.wrds);
		});
		completeCallback(null, results);
	});
}

module.exports = {
	search: search
};
