var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../lib/utils/expressions');

vows.describe('Expressions: selector name').addBatch({
	'A class definition': {
		topic: '.selector'.match(expressions.selectorName),
		'should return just the class': function(topic) {
			assert.equal(topic[0], 'selector');
		}
	},
	'An id definition': {
		topic: '#selector'.match(expressions.selectorName),
		'should return just the id': function(topic) {
			assert.equal(topic[0], 'selector');
		}
	},
	'A quoted string': {
		topic: '"selector"'.match(expressions.selectorName),
		'should return just the class': function(topic) {
			assert.equal(topic[0], 'selector');
		}
	},
	'A differently quoted attribute': {
		topic: "'selector'".match(expressions.selectorName),
		'should return just the class': function(topic) {
			assert.equal(topic[0], 'selector');
		}
	},
	'Multiple classes in a string': {
		topic: '"selector1, selector2'.match(expressions.selectorName),
		'should all be returned': function(topic) {
			assert.equal(topic.length, 2);
		}
	}
}).export(module);