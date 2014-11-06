var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../../lib/utils/expressions');

vows.describe('Expressions: element attribute').addBatch({
	'An id attribute': {
		topic: 'id="selector"'.match(expressions.elementAttribute),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'A class attribute': {
		topic: 'class="selector"'.match(expressions.elementAttribute),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'A for attribute': {
		topic: 'for="selector"'.match(expressions.elementAttribute),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'An href attribute': {
		topic: 'href="selector"'.match(expressions.elementAttribute),
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A class attribute with different quotes': {
		topic: "class='selector'".match(expressions.elementAttribute),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	},
	'A class attribute with awkward spacing': {
		topic: 'class = "selector"'.match(expressions.elementAttribute),
		'should return a match': function(topic) {
			assert.equal(topic.length, 1);
		}
	}
}).export(module);