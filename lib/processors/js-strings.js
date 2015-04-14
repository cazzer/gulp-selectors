var expressions = require('../utils/expressions');

/**
 * Dumb search for all strings in all JS files. This will only work on libraries which are fully built.
 *
 * @param file String
 * @returns {reducedFile String}
 */
module.exports = function(file, classLibrary, idLibrary) {

	classLibrary.getFullNames().forEach(function(selector) {
		file = file.replace(expressions.jsString(selector), function() {
			return "'" + classLibrary.get(selector) + "'";
		});
	});

	idLibrary.getFullNames().forEach(function(selector) {
		file = file.replace(expressions.jsString(selector), function() {
			return "'" + idLibrary.get(selector) + "'";
		});
	});

	return file;
};