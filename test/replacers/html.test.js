var vows = require('vows'),
	assert = require('assert'),
	html = require('../../lib/replacers/html'),
	Library = require('../../lib/utils/library');

vows.describe('HTML Replacer').addBatch({
	'A class attribute': {
		topic: '<div class="hello-world">',
		'should be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = html(topic, classLibrary, idLibrary);

			assert.equal(minified, '<div class="a">')
		}
	},
	'An id name': {
		topic: '<div id="hello-world">',
		'should be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = html(topic, classLibrary, idLibrary);

			assert.equal(minified, '<div id="a">')
		}
	},
	'A hex value': {
		topic: '<div for="hello-world">',
		'should not be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = html(topic, classLibrary, idLibrary);

			assert.equal(minified, '<div for="a">')
		}
	}
}).export(module);