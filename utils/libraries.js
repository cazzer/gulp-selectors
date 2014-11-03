var _ = require('lodash');
var generateShortname = require('./generate-shortname');

var libraries = {};

/**
 * Provides libraries
 *
 * @param libraryName String
 * @returns {library}
 */
module.exports = function(libraryName) {
	if (libraries[libraryName]) {
		return libraries[libraryName];
	}

	libraries[libraryName] = Library();
	return libraries[libraryName];
};

/**
 * This handy function returns an empty library.
 *
 * @returns {Library}
 * @constructor
 */
function Library() {
	var Library = {},
		_library = {},
		size = 0;

	/**
	 * Tests if a value exists in the library.
	 *
	 * @params {name} String
	 * @returns {boolean} Bool for if it exists
	 */
	Library.has = function(name) {
		return (_library[name] !== undefined) ? true : false;
	};

	/**
	 * Ensures the name is set and returns it.
	 *
	 * @param name String name to get shortname for from the library
	 * @param dontCount Bool to not to count this as a use in the code
	 * @returns {shortname} String of the minified name
	 */
	Library.get = function(name, dontCount) {
		var shortname;

		if (_library[name]) {
			shortname = _library[name].shortname;
			if (!dontCount) {
				_library
			}
		} else {
			shortname = generateShortname(size);
			_library[name] = {
				shortname: shortname,
				hits: 0
			};
			size++;
		}

		return shortname;
	};

	/**
	 * Returns all of the shortnames in the library.
	 *
	 * @returns {shortnames} Array of all shortnames.
	 */
	Library.getAll = function() {
		return _.pluck(_library, 'shortname');
	};

	/**
	 * Retrieves shortnames which are not used in the code processed.
	 *
	 * @returns {shortnames} Array of unused names
	 */
	Library.getUnused = function() {
		return _.pluck(
			_.filter(
				_library,
				function(entry) {
					return entry.hits > 0;
				}), 'shortname');
	};

	/**
	 * Returns the size of the library.
	 *
	 * @returns {number} Number of entries in the library
	 */
	Library.size = function() {
		return size;
	};

	return Library;
}