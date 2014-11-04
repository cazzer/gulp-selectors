var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../src/utils/expressions');

vows.describe('Expressions: selector').addBatch({
	'An id selector': {
		topic: '#selector'.match(expressions.selector),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'An class selector': {
		topic: '.selector'.match(expressions.selector),
		'should return one match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'Nested class selectors': {
		topic: '.selector .child'.match(expressions.selector),
		'should return two matches': function(topic) {
			assert.equal(topic.length, 2);
		}
	},
	'A pseudo selector': {
		topic: ':hover'.match(expressions.selector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A tag selector': {
		topic: 'body'.match(expressions.selector),
		'should return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A hash value': {
		topic: '#e6e6e6;'.match(expressions.selector),
		'should return a match which include the semicolon': function(topic) {
			assert.equal(topic[0], '#e6e6e6;');
		}
	},
	'A hash value': {
		topic: '#e6e6e6}'.match(expressions.selector),
		'should return a match which include the close bracket': function(topic) {
			assert.equal(topic[0], '#e6e6e6}');
		}
	},
	'A string beginning with a number': {
		topic: '#666'.match(expressions.selector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A string beginning with a weird character': {
		topic: '#:selector'.match(expressions.selector),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	}
}).export(module);