var vows = require('vows'),
	assert = require('assert'),
	css = require('../../lib/replacers/css'),
	Library = require('../../lib/utils/library');

vows.describe('CSS Replacer').addBatch({
	'A class name': {
		topic: '.hello-selector{property:value;}',
		'should be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = css(topic, classLibrary, idLibrary);

			assert.equal(minified, '.a{property:value;}')
		}
	},
	'An id name': {
		topic: '#hello-selector{property:value;}',
		'should be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = css(topic, classLibrary, idLibrary);

			assert.equal(minified, '#a{property:value;}')
		}
	},
	'A hex value': {
		topic: '.a{color:#eee;}.b{color:#666}',
		'should not be minified': function(topic) {
			var classLibrary = new Library(),
				idLibrary = new Library(),
				minified = css(topic, classLibrary, idLibrary);

			assert.equal(minified, '.a{color:#eee;}.b{color:#666}')
		}
	},
	'A file extension in a stylesheet': {
		topic: '.selector{background: url(file.extension);}',
		'should not be matched': function(topic) {
			var classLibrary = new Library(),
				minified = css(topic, classLibrary);

			assert.equal(minified, '.a{background: url(file.extension);}');
		}
	}
}).export(module);