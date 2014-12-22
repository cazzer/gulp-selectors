'use strict';
var es = require('event-stream'),
	_ = require('lodash'),
	utils = require('gulp-util'),
	processorUtils = require('./lib/utils/processor-utils'),
	Library = require('./lib/utils/library');

var classLibrary,
	idLibrary;

module.exports = {
	run: run,
	minify: run,
	info: info
};

function run(processors, ignores) {
	//initialize ignores
	ignores = _.extend({classes: [], ids: []}, ignores);

	//ensure processor names are set as expected
	processors = processorUtils.extendDefaults(processors);

	//build new libraries to use
	classLibrary = new Library(ignores.classes || []);
	idLibrary = new Library(ignores.ids || []);

	/**
	 * Main task for mini selectors uglify classes. Processes files based on type.
	 *
	 * @param file Stream from es.map
	 * @param callback for es.map
	 */
	function miniSelectors(file, callback) {
		var extensions = file.path.split('.'),
			extension = extensions[extensions.length - 1],
			reducedFile = String(file.contents);

		processorUtils.getForExtension(processors, extension).forEach(function(processor) {
			reducedFile = processor(reducedFile, classLibrary, idLibrary);
		});

		file.contents = new Buffer(reducedFile);
		callback(null, file);
	}

	return es.map(miniSelectors);
}

function info() {
	return es.map(function(file, callback) {
		utils.log('Class library:');
		utils.log(classLibrary.stats());
		utils.log('ID library:');
		utils.log(idLibrary.stats());

		callback(null, file);
	});
}