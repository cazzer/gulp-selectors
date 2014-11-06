'use strict';
var through = require('through2'),
	_ = require('lodash'),
	processorUtils = require('./lib/utils/processor-utils'),
	Library = require('./lib/utils/library');

var classLibrary,
	idLibrary;

module.exports = {
	run: run
};

function run(processors, ignores) {
	//initialize ignores
	ignores = _.extend({classes: [], ids: []}, ignores);

	//build new libraries to use
	classLibrary = new Library(ignores.classes || []);
	idLibrary = new Library(ignores.ids || []);

	//ensure processor names are set as expected
	processors = processorUtils.mapNames(processors);

	/**
	 * Main task for mini selectors uglify classes. Processes files based on type.
	 *
	 * @param file Stream from through2
	 * @param encoding
	 * @param callback for through2
	 */
	function miniSelectors(file, encoding, callback) {
		var extensions = file.path.split('.'),
			extension = extensions[extensions.length - 1],
			reducedFile = String(file.contents);

		processorUtils.getForExtension(processors, extension).forEach(function(processor) {
			reducedFile = processor(reducedFile, classLibrary, idLibrary);
		});

		file.contents = new Buffer(reducedFile);
		this.push(file);
		callback();
	}

	return through.obj(miniSelectors);
}