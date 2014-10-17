var vows = require('vows'),
	assert = require('assert'),
	expressions = require('../utils/expressions');

vows.describe('Expressions: selector').addBatch({

	'An id selector': {
		topic: function() {
			return "#selector".match(expressions.selector).length;
		},
		'should return a match': function(topic) {
			assert.equal(topic, 1);
		}
	},
	'An class selector': {
		topic: function() {
			return ".selector".match(expressions.selector).length;
		},
		'should return one match': function(topic) {
			assert.equal(topic, 1);
		}
	},
	'Nested class selectors': {
		topic: function() {
			return ".selector .child".match(expressions.selector).length;
		},
		'should return two matches': function(topic) {
			assert.equal(topic, 2);
		}
	},
	'A pseudo selector': {
		topic: function() {
			return ":hover".match(expressions.selector);
		},
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A tag selector': {
		topic: function() {
			return "body".match(expressions.selector);
		},
		'should return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A hash value': {
		topic: function() {
			return "#e6e6e6;".match(expressions.selector)[0];
		},
		'should return a match which include the semicolon': function(topic) {
			assert.equal(topic, "#e6e6e6;");
		}
	},
	'A hash value': {
		topic: function() {
			return "#e6e6e6}".match(expressions.selector)[0];
		},
		'should return a match which include the close bracket': function(topic) {
			assert.equal(topic, "#e6e6e6}");
		}
	},
	'A string beginning with a number': {
		topic: function() {
			return "#666".match(expressions.selector);
		},
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	},
	'A string beginning with a weird character': {
		topic: function() {
			return "#:selector".match(expressions.selector);
		},
		'should not return a match': function(topic) {
			assert.equal(topic, null);
		}
	}
}).export(module);