"use strict"; "or whatever";

function iaol(len) {
	var l = [];
	for (var i=0; i<len; i++) {
		l.push(0);
	}
	return l;
}

class CalcWord {
	constructor(text, strip) {
		this.text = text;
		this.strip = strip;
		this.let = iaol(26);
		this.wrds = [];
		this.reset(false);
	}

	reset(doZero) {
		if (doZero) {
			for (var i=0; i<26; i++) {
				this.let[i] = 0;
			}
		}
		this.strip.split('').forEach(c => {
			var idx = c.charCodeAt(0) - 97;
			this.let[idx]++;
		});
	}

	contains(cw) {
		for (var i=0; i<26; i++) {
      if (this.let[i] < cw.let[i]) return false;
		}
		return true;
	}

	subtract(cw) {
		//console.log('subtracting '+cw.strip+' from '+this.strip+' '+this.let);
		for (var i=0; i<26; i++) {
      this.let[i] -= cw.let[i];
		}
		this.wrds.push(cw.text);
		//console.log(this.strip+' is now '+this.let);
	}

	empty() {
		for (var i=0; i<26; i++) {
      if (this.let[i] != 0) return false;
		}
		return true;
	}

	clone() {
		var cw = new CalcWord(this.text, this.strip);
		for (var i=0; i<26; i++) {
			cw.let[i] = this.let[i];
		}
		if (this.wrds.length > 0) {
			this.wrds.forEach(ww => {
				cw.wrds.push(ww);
			})
		}
		return cw;
	}
}

module.exports.CalcWord = CalcWord;

