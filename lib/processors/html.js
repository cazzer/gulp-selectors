var expressions = require('../utils/expressions');

/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
module.exports = function (file, classLibrary, idLibrary) {

	file = file.replace(expressions.elementAttribute, function(attributes) {
		var attribute = attributes.split('=');
		var attr = attribute[0];
		var val = attribute[1];

		val = val.replace(expressions.selectorName, function(selectorName) {
			switch (attr) {
				case 'id':
				case 'for':
				case 'aria-labelledby':
				case 'href':
					return idLibrary.get(selectorName);
				default: //classes
					return classLibrary.get(selectorName);
			}
		});

		return attr + '=' + val;
	});

	// Knockout.js
	classLibrary.getFullNames().forEach(function(selector) {

		file = file.replace(expressions.knockoutAttribute, function() {
			var match = arguments[0],
				bind = arguments[4];

			if (bind.match(expressions.knockoutClassString(selector))) {
				return match.replace(bind, function() {
					return bind.replace(expressions.knockoutClassString(selector), function (match) {
						return match.replace(expressions.quoteSelector, function (match) {
							return match.replace(expressions.knockoutClassString(selector, true), function(matched) {
								return matched.replace(selector, classLibrary.get(selector));
							});
						});
					});
				});
			}

			return match;
		});

	});

	return file;
};