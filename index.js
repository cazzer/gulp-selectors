'use strict';
var through = require('through2'),
	PluginError = require('gulp-util/lib/PluginError'),
	pluginName = 'mini-selectors';

var expressions = {
	selectorMatch: /(\.|#)(-?[_a-zA-Z]+[_\w-]*)\s*;*}*/g,
	selectorNameMatch: /(-?[_a-zA-Z]+[_\w-]*)/g,
	selectorAttributeMatch: /(class|id|for)\s*=\s*["'](-?[_a-zA-Z]+[_\w-\s]*)["']/g
};

module.exports = function() {

	var classLibrary = {},
		shortClassLibrary = [],
		idLibrary = {},
		shortIdLibrary = [];

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
		var classNameMatch = expressions.selectorMatch,
			nameMatch = expressions.selectorNameMatch;

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
						return getShortname(selector, classLibrary, shortClassLibrary);
					case '#':
						return getShortname(selector, idLibrary, shortIdLibrary);
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
		return file.replace(expressions.selectorAttributeMatch, function(attributes) {
			var attribute = attributes.split('=');
			return attribute[0] + '=' + attribute[1]
				.replace(expressions.selectorNameMatch, function(selectorName) {
					switch (attribute[0]) {
						case 'class':
							return getShortname(selectorName, classLibrary, shortClassLibrary);
						case 'id':
						case 'for':
							return getShortname(selectorName, idLibrary, shortIdLibrary);
						default:

					}
				});
		});
	}

	return through.obj(miniSelectors);
};

/**
 * Helper function for getting a shortname. Generates a new shortname if it does not exist.
 *
 * @param selector String representing the name of the item to get a shortname for
 * @param fullLibrary Object {selector: {shortName: shortName}, ...}
 * @param shortLibrary Array [shortName, ...]
 * @returns {shortName String} From library or from generator
 */
function getShortname(selector, fullLibrary, shortLibrary) {
	var shortName;

	if (!fullLibrary[selector]) {
		//check if the shortname is in the library
		shortName = generateShortname(shortLibrary.length);
		fullLibrary[selector] = {
			shortName: shortName
		}
		shortLibrary.push(shortName);
	} else {
		//grab the shortname that already exists
		shortName = fullLibrary[selector].shortName;
	}

	return shortName;
}

/**
 * Helper function for generating shortnames based on an alphabetic library.
 *
 * @param seed Integer
 * @returns {string Shortname}
 */
function generateShortname(seed) {
	var library = 'abcdefghijklmnopqrstuvwxyz',
		libraryLength = library.length,
		prefix = '';
	//break the seed down if it is larger than the library
	if (seed >= libraryLength) {
		prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
	}
	//return the prefixed shortname
	return prefix + library[seed % libraryLength];
}