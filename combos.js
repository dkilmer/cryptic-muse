function iaol(len) {
	var l = [];
	for (var i=0; i<len; i++) {
		l.push(0);
	}
	return l;
}

function fill(l, n, w, idx, list) {
	if (idx == 0) {
		for (var i=0; i<(n-1); i++) {
			var nl = iaol(w);
			nl[idx] = (i+1);
			fill(nl, n, w, idx+1, list);
		}
	} else {
		for (var i=l[idx-1]; i<n; i++) {
			var nl = iaol(w);
			for (var j=0; j<idx; j++) {
				nl[j] = l[j];
			}
			nl[idx] = (i+1);
			if (idx == (w-1)) {
				list.push(nl);
			} else {
				fill(nl, n, w, idx+1, list);
			}
		}
	}
}

function combos(n, w) {
	var list = [];
	var na = iaol(w);
	fill(na, n, w, 0, list);
	return list;
}

module.exports = {
	combos: combos
};

//var tl = combos(5, 2);
//console.log(tl);