var expressions = require('../utils/expressions');

/**
 * Dumb search for all strings in all JS files. This will only work on libraries which are fully built.
 *
 * @param file String
 * @returns {reducedFile String}
 */
module.exports = function(file, classLibrary, idLibrary) {

	const idReg = (name) => {
		return new RegExp('idList: /(?:\\$|jQuery|(?:\\.(?:getElementById|id|jQuery|attr)))\\s*[\\(=]{1}\\s*["\']{1}#?(${name})["\']{1}')
	}

	const classReg = (name) => {
		return new RegExp(`(?:\\$|jQuery|(?:\\.(?:getElementsByClassName|classList\\.add|classList\\.remove||classList\\.contains|className|jQuery|addClass|toggleClass|removeClass|attr|hasClass)))\\s*[\\(=]{1}\\s*["\']{1}\\.?(${name})["\']{1}`, 'g');
	}

	classLibrary.getFullNames().forEach(function(selector) {
		[...file.matchAll(classReg(selector))].forEach(match => file = file.replace(match[0], match[0].replace(match[1], classLibrary.get(selector))))
	});

	idLibrary.getFullNames().forEach(function(selector) {
		[...file.matchAll(idReg(selector))].forEach(match => file = file.replace(match[0], match[0].replace(match[1], idLibrary.get(selector))))
	});

	return file;
};
