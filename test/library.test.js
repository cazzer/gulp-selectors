var vows = require('vows'),
	assert = require('assert'),
	Library = require('../lib/utils/library');

var testLibrary = new Library();

vows.describe('Libraries').addBatch({
	'Calling the module with a new string': {
		topic: new Library(),
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
			var library = new Library();
			library.get('defined');
			library.get('another');
			return library;
		},
		'should return all shortnames in the library' : function(topic) {
			assert.deepEqual(topic.getAll(), [
				topic.get('defined'),
				topic.get('another')
			]);
		}
	},
	'Get unused': {
		topic: function() {
			var library = new Library();
			library.get('defined');
			library.get('defined');
			library.get('unused');
			return library;
		},
		'should return only unused shortnames': function(topic) {
			assert.deepEqual(topic.getUnused(), [
				topic.get('unused')
			]);
		}
	},
	'Size of an empty library': {
		topic: function() {
			return new Library().size();
		},
		'should be 0': function(topic) {
			assert.equal(topic, 0);
		}
	},
	'Size of a non empty library': {
		topic: function() {
			var library = new Library();
			library.get('defined');
			return library.size();
		},
		'should be 1': function(topic) {
			assert.equal(topic, 1);
		}
	},
	'Adding ignored entries': {
		topic: function() {
			var library = new Library(['ignored']);
			return library.get('ignored');
		},
		'should return the full name': function(topic) {
			assert.equal(topic, 'ignored');
		}
	}
}).export(module);