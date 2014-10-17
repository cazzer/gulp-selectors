var vows = require('vows'),
	assert = require('assert'),
	generateShortname = require('../utils/generate-shortname');

vows.describe('Generating Shortnames').addBatch({
	//standard cases
	'A seed of 0': {
		topic: generateShortname(0),
		'should return the shortname "a"': function(topic) {
			assert.equal(topic, 'a');
		}
	},
	'A seed of 1': {
		topic: generateShortname(1),
		'should return the shortname "ab"': function(topic) {
			assert.equal(topic, 'b');
		}
	},
	'A seed of 26': {
		topic: generateShortname(26),
		'should return the shortname "aa"': function(topic) {
			assert.equal(topic, 'aa');
		}
	},
	'A seed of 27': {
		topic: generateShortname(27),
		'should return the shortname "ab"': function(topic) {
			assert.equal(topic, 'ab');
		}
	},
	//edge cases
	'A seed of -1': {
		topic: function() {
			generateShortname(-1)
		},
		'should throw an error': function(topic) {
			assert.throws(topic, Error);
		}
	},
	'A non numeric seed': {
		topic: function() {
			generateShortname('a')
		},
		'should throw an error': function(topic) {
			assert.throws(topic, Error);
		}
	},
	'A seed of 1234': {
		topic: generateShortname(1234),
		'should return the shortname "aum"': function(topic) {
			assert.equal(topic, 'aum');
		}
	}
}).export(module);