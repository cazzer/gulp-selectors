var expressions = require('../utils/expressions'),
	libraries = require('../utils/libraries');

var classLibrary = libraries('class'),
	idLibrary = libraries('id');

/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param file String
 * @returns {reducedFile String}
 */
module.exports = function (file) {
	return file.replace(expressions.elementAttribute, function(attributes) {
		var attribute = attributes.split('=');
		return attribute[0] + '=' + attribute[1]
			.replace(expressions.selectorName, function(selectorName) {
				switch (attribute[0]) {
					case 'class':
						return classLibrary.get(selectorName).shortname;
					case 'id':
					case 'for':
						return idLibrary.get(selectorName).shortname;
					default:

				}
			});
	});
};