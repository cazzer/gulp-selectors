var vows = require('vows'),
	assert = require('assert'),
	libraries = require('../src/utils/libraries');

var testLibrary = libraries('test');

vows.describe('Libraries').addBatch({
	'Calling the module with a new string': {
		topic: libraries('library'),
		'should give us a new library to play with': function(topic) {
			//this one is here to make sure the API is intact
			assert(topic.has);
			assert(topic.get);
			assert(topic.getAll);
			assert(topic.getUnused);
			assert(topic.size);
		}
	},
	'Calling has with an undefined name': {
		topic: testLibrary.has('undefined'),
		'should return false' : function(topic) {
			assert.equal(topic, false);
		}
	},
	'Calling has with a defined name': {
		topic: function() {
			testLibrary.get('defined');
			return testLibrary.has('defined');
		},
		'should return false' : function(topic) {
			assert.equal(topic, true);
		}
	},
	'Calling get twice for the same name': {
		topic: testLibrary.get('defined'),
		'should return the same shortname' : function(topic) {
			assert.equal(topic, testLibrary.get('defined'));
		}
	},
	'Calling get all': {
		topic: function() {
			testLibrary.get('defined');
			testLibrary.get('another');
			return testLibrary.getAll();
		},
		'should return all shortnames in the library' : function(topic) {
			assert.deepEqual(topic, [
				testLibrary.get('defined'),
				testLibrary.get('another')
			]);
		}
	}
}).export(module);