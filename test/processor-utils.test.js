var vows = require('vows'),
	assert = require('assert'),
	utils = require('../lib/utils/processor-utils');

var testProcessors = {
		css: ['html', 'js']
	},
	mappedProcessors = utils.extendDefaults(testProcessors);

vows.describe('Processor utilities').addBatch({
	'Extending defaults names with an empty argument': {
		topic: utils.extendDefaults(),
		'should return css and html default processors': function(topic) {
			assert.deepEqual(topic, {
				css: ['css'],
				html: ['html']
			});
		}
	},
	'Extending defaults names with redefined css arguments': {
		topic: utils.extendDefaults(testProcessors),
		'should return different css values': function(topic) {
			assert.deepEqual(topic, {
				css: ['html', 'js'],
				html: ['html']
			});
		}
	},
	'Extending defaults names with a random argument': {
		topic: utils.extendDefaults({'js-strings': ['js']}),
		'should return that random argument': function(topic) {
			assert.deepEqual(topic['js-strings'], ['js']);
		}
	},
	'Getting processors for an extension': {
		topic: function() {
			return utils.getForExtension(mappedProcessors, 'js');
		},
		'should return the module for that extension': function(topic) {
			assert.deepEqual(topic, [
				require('../lib/processors/css')
			]);
		}
	},
	'Getting processors for an extension with multiple processors': {
		topic: function() {
			return utils.getForExtension(mappedProcessors, 'html');
		},
		'should return all processors in the correct order': function(topic) {
			assert.deepEqual(topic, [
				require('../lib/processors/css'),
				require('../lib/processors/html')
			]);
		}
	}
}).export(module);