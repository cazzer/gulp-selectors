var vows = require('vows'),
	assert = require('assert'),
	utils = require('../lib/utils/processor-utils');

var testProcessors = {
		css: ['css', 'html', 'js'],
		html: ['js']
	},
	mappedProcessors = utils.mapNames(testProcessors);

vows.describe('Processor utilities').addBatch({
	'Mapping processor names with an empty argument': {
		topic: utils.mapNames(),
		'should return css and html default mapped to the local modules': function(topic) {
			assert.deepEqual(topic, {
				css: false,
				html: false,
				'../replacers/css': ['css'],
				'../replacers/html': ['html']
			});
		}
	},
	'Mapping processor names with redefined css arguments': {
		topic: utils.mapNames(testProcessors),
		'should return different css values': function(topic) {
			assert.deepEqual(topic['../replacers/css'], ['css', 'html', 'js']);
		}
	},
	'Mapping processor names with a random argument': {
		topic: utils.mapNames({'js-strings': ['js']}),
		'should return that random argument': function(topic) {
			assert.deepEqual(topic['js-strings'], ['js']);
		}
	},
	'Gettings processors for an extension': {
		topic: function() {
			return utils.getForExtension(mappedProcessors, 'css');
		},
		'should return the module for that extension': function(topic) {
			assert.deepEqual(topic, [
				require('../lib/replacers/css')
			]);
		}
	},
	'Gettings processors for a different extension': {
		topic: function() {
			return utils.getForExtension(mappedProcessors, 'html');
		},
		'should return the other module for that extension': function(topic) {
			assert.deepEqual(topic, [
				require('../lib/replacers/css')
			]);
		}
	},
	'Gettings processors extensions with multiple processors': {
		topic: function() {
			return utils.getForExtension(mappedProcessors, 'js');
		},
		'should return all the processors': function(topic) {
			assert.deepEqual(topic, [
				require('../lib/replacers/css'),
				require('../lib/replacers/html')
			]);
		}
	}
}).export(module);