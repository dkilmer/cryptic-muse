"use strict"; "or whatever";

class Word {
	constructor(text) {
		this.text = text;
		this.strip = this.calcStrip(text);
		this.reverse = this.calcReverse(this.strip);
		this.sort = this.calcSort(this.strip);
		this.letters = this.calcLetters(this.strip);
		this.mask = this.calcMask(this.strip);
		this.length = this.strip.length;
	}

  contains(word) {
    if (this.length < word.length) return false;
    if ((this.mask & word.mask) != word.mask) return false;
		word.strip.split('').forEach(c => {
			var idx = c.charCodeAt(0) - 97;
			if (this.letters[i] < word.letters[i]) return false;
		});
    return true;
  }

	calcStrip(w) {
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

	calcReverse(w) {
		return w.split('').reverse().join('');
	}

	calcSort(w) {
		return w.split('').sort().join('');
	}

	calcLetters(w) {
		var l = [];
		for (var i=0; i<26; i++) {
			l.push(0);
		}
		w.split('').forEach(c => {
			var idx = c.charCodeAt(0) - 97;
			l[idx]++;
		});
		return l;
	}

	calcMask(w) {
		var mask = 0;
		w.split('').forEach(c => {
			var idx = c.charCodeAt(0) - 97;
			mask = mask | (1 << idx);
		});
		return mask;
	}
}

module.exports.Word = Word;

