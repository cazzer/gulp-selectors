var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../lib/utils/expressions');

vows.describe('Expressions: js string selectors').addBatch({
	'An custom selector with a present name': {
		topic: '"selector"'.match(expressions.jsString('selector')),
		'should return one match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'An custom selector without a present name': {
		topic: '"selector"'.match(expressions.jsString('undefined')),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	}
}).export(module);