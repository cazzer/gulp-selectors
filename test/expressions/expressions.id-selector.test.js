var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../../lib/utils/expressions');

vows.describe('Expressions: selector').addBatch({
	'An id selector': {
		topic: '#selector {'.match(expressions.idSelector),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'A compressed id selector': {
		topic: '#selector{'.match(expressions.idSelector),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'A hash value': {
		topic: '#e6e6e6;'.match(expressions.idSelector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A string beginning with a number': {
		topic: '#666 {'.match(expressions.idSelector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A string beginning with a weird character': {
		topic: '#:selector {'.match(expressions.idSelector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	}
}).export(module);
