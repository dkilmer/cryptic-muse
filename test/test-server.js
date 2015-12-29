"use strict"; "or whatever";

import chai from 'chai';
import server from '../server';
var should = chai.should();

describe('anagram service', () => {
	it('should return correct values', (done) => {
		chai.request(server)
			.get('/anagram/being')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.equal(6);
				res.body[0].should.be.a('array');
				res.body[0][0].should.equal('binge');
				done();
			});	
	});
});