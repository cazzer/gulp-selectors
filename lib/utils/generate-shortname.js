module.exports = generateShortname;

	/**
 * Helper function for generating shortnames based on an alphabetic library.
 *
 * @param seed Integer
 * @returns {string Shortname}
 */
function generateShortname(seed) {
	if (seed !== parseInt(seed, 10)) {
		throw new Error('Seed must be a number');
	}

	if (seed < 0) {
		throw new Error('Seed must be at least 0');
	}

	var library = 'abcdefghijklmnopqrstuvwxyz',
		libraryLength = library.length,
		prefix = '';
	//break the seed down if it is larger than the library
	if (seed >= libraryLength) {
		prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
	}
	//return the prefixed shortname
	return '_x' + prefix + library[seed % libraryLength];
}