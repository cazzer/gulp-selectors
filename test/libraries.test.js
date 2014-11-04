var vows = require('vows'),
	assert = require('assert'),
	libraries = require('../lib/utils/libraries');

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
	'Get all': {
		topic: function() {
			libraries('get-all').get('defined');
			libraries('get-all').get('another');
			return libraries('get-all').getAll();
		},
		'should return all shortnames in the library' : function(topic) {
			assert.deepEqual(topic, [
				libraries('get-all').get('defined'),
				libraries('get-all').get('another')
			]);
		}
	},
	'Get unused': {
		topic: function() {
			libraries('some-unused').get('defined');
			libraries('some-unused').get('defined');
			libraries('some-unused').get('unused');
			return libraries('some-unused').getUnused();
		},
		'should return only unused shortnames': function(topic) {
			assert.deepEqual(topic, [
				libraries('some-unused').get('unused')
			]);
		}
	},
	'Size of an empty library': {
		topic: function() {
			return libraries('new').size();
		},
		'should be 0': function(topic) {
			assert.equal(topic, 0);
		}
	},
	'Size of a non empty library': {
		topic: function() {
			libraries('non-empty').get('defined');
			return testLibrary.size();
		},
		'should be 1': function(topic) {
			assert.equal(topic, 1);
		}
	}
}).export(module);