var expressions = require('../utils/expressions'),
	libraries = require('../utils/libraries');

var classLibrary = libraries('class').getAll(),
	idLibrary = libraries('id').getAll();

/**
 * Dumb search for all strings in all JS files. This will only work on libraries which are fully built.
 *
 * @param file String
 * @returns {reducedFile String}
 */
module.exports = function(file) {

	for (var selector in classLibrary) {
		file = file.replace(expressions.jsString(selector), function() {
			return "'" + classLibrary[selector] + "'";
		});
	}

	for (var selector in idLibrary) {
		file = file.replace(expressions.jsString(selector), function() {
			return "'" + idLibrary[selector] + "'";
		});
	}

	return file;
};