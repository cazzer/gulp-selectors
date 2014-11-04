var generateShortname = require('./generate-shortname');

/**
 * Helper function for getting a shortname. Generates a new shortname if it does not exist.
 *
 * @param selector String representing the name of the item to get a shortname for
 * @param fullLibrary Object {selector: {shortName: shortName}, ...}
 * @param shortLibrary Array [shortName, ...]
 * @returns {shortName String} From library or from generator
 */
module.exports = function(selector, fullLibrary, shortLibrary) {
	var shortName;

	if (!fullLibrary[selector]) {
		//check if the shortname is in the library
		shortName = generateShortname(shortLibrary.length);
		fullLibrary[selector] = {
			shortName: shortName
		};
		shortLibrary.push(shortName);
	} else {
		//grab the shortname that already exists
		shortName = fullLibrary[selector].shortName;
	}

	return shortName;
};