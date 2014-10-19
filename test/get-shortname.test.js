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
	}
}).export(module);