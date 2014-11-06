var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../lib/utils/expressions');

vows.describe('Expressions: class selectors').addBatch({
	'An class selector': {
		topic: '.selector'.match(expressions.classSelector),
		'should return one match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'Nested class selectors': {
		topic: '.selector .child'.match(expressions.classSelector),
		'should return two matches': function(topic) {
			assert.equal(topic.length, 2);
		}
	},
	'A pseudo selector': {
		topic: ':hover'.match(expressions.classSelector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A tag selector': {
		topic: 'body'.match(expressions.classSelector),
		'should return a match': function(topic) {
			assert.equal(topic, null);
		}
	}
}).export(module);