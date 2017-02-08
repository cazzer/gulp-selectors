var expressions = require('../utils/expressions');

/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
module.exports = function (file, classLibrary, idLibrary) {
	return file.replace(expressions.elementAttribute, function(attributes) {
		var attribute = attributes.split('=');
		return attribute[0] + '=' + attribute[1]
			.replace(expressions.selectorName, function(selectorName) {
				switch (attribute[0]) {
					case 'id':
					case 'for':
					case 'href':
						return idLibrary.get(selectorName);
					default: //class
						return classLibrary.get(selectorName);
				}
			});
	});
};