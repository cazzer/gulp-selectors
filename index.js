'use strict';
var through = require('through2'),
	PluginError = require('gulp-util/lib/PluginError'),
	expressions = require('utils/expressions'),
	getShortname = require('utils/get-shortname'),
	libs = require('utils/libraries'),
	pluginName = 'mini-selectors';

module.exports = function() {
	/**
	 * Main task for uglify classes. Processes files based on type.
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
			case 'scss':
			case 'sass':
			case 'less':
				reducedFile = replaceCssSelectors(fileString);
				break;
			case 'html':
				reducedFile = replaceHtmlSelectors(fileString);
				break;
			case 'js':
				reducedFile = file;
				break;
			default:
				return callback(
					new PluginError(pluginName, 'Filetype not supported: ' + extension, {
						fileName: file.path,
						showStack: false
					}));
		}

		file.contents = new Buffer(reducedFile);
		this.push(file);
		callback();
	}

	/**
	 * Replaces all class names with shortnames. Also builds a library of shortnames which can be
	 * used to reduce other file types.
	 *
	 * @param file String
	 * @returns {reducedFile String}
	 */
	function replaceCssSelectors(file) {
		var classNameMatch = expressions.selector,
			nameMatch = expressions.selectorName;

		return file.replace(classNameMatch, function(match) {
			//exclude property values (matches ending in ';')
			if (match[match.length - 1] === ';' || match[match.length - 1] === '}') {
				return match;
			}

			//get the selector type and name
			var selectorType = match.substr(0, 1);

			return match.replace(nameMatch, function(selector) {
				switch (selectorType) {
					case '.':
						return getShortname(selector, libs.classLibrary, libs.shortClassLibrary);
					case '#':
						return getShortname(selector, libs.idLibrary, libs.shortIdLibrary);
					default:
						//probably don't touch something we don't understand
						console.log(selector);
						return selector;
				}
			});
		});
	}

	/**
	 * Replaces all class and id attributes found in the library. Only tested on *.html files with
	 * classes declared in *class= attributes.
	 *
	 * @param file String
	 * @returns {reducedFile String}
	 */
	function replaceHtmlSelectors(file) {
		return file.replace(expressions.elementAttribute, function(attributes) {
			var attribute = attributes.split('=');
			return attribute[0] + '=' + attribute[1]
				.replace(expressions.selectorName, function(selectorName) {
					switch (attribute[0]) {
						case 'class':
							return getShortname(
								selectorName, libs.classLibrary, libs.shortClassLibrary);
						case 'id':
						case 'for':
							return getShortname(selectorName, libs.idLibrary, libs.shortIdLibrary);
						default:

					}
				});
		});
	}

	return through.obj(miniSelectors);
};