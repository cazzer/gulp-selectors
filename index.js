'use strict';
var through = require('through2'),
	replaceCssSelectors = require('./replacers/css-selectors'),
	replaceHtmlAttributes = require('./replacers/html-attributes'),
	replaceJsStrings = require('./replacers/js-strings');

module.exports = function() {
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
			fileString = String(file.contents),
			reducedFile;

		switch (extension) {
			case 'css':
				reducedFile = replaceCssSelectors(fileString);
				break;
			case 'html':
				reducedFile = replaceHtmlAttributes(fileString);
				break;
			case 'js':
				reducedFile = replaceJsStrings(fileString);
				break;
			default:
				reducedFile = fileString;
				console.log('Filetype not supported: ' + extension + ', ignoring');
				break;
		}

		file.contents = new Buffer(reducedFile);
		this.push(file);
		callback();
	}

	return through.obj(miniSelectors);
};