var _ = require('lodash'),
	multimatch = require('multimatch'),
	generateShortname = require('./generate-shortname');

/**
 * Provides libraries.
 */
module.exports = Library;

/**
 * This handy function returns an empty library. This should be a module on its own so that the
 * logic of retrieving a library does not get mixed up with the library logic itself.
 *
 * @returns {object} Library
 * @constructor
 */
function Library(ignores) {
	var _library = {},
		_ignores = ignores || [],
		size = 0;

	/**
	 * Tests if a value exists in the library.
	 *
	 * @params {string} name
	 * @returns {boolean} Bool for if it exists
	 */
	this.has = function(name) {
		return _library[name] !== undefined;
	};

	/**
	 * Ensures the name is set and returns it. If generates an ignored name,
	 * will increase size and try again
	 *
	 * @param name String name to get shortname for from the library
	 * @param dontCount Bool to not to count this as a use in the code
	 * @returns {string} Shortname of the minified name
	 */
	this.get = function(name, dontCount) {
		//catch all for ignoring IDs
		if (ignores === true) return name;

		var shortname;

		if (_library[name]) {
			shortname = _library[name].shortname;
			if (!dontCount) {
				_library[name].hits++;
			}
		} else if (!multimatch(name, _ignores).length) {
			do {
				shortname = 'xx'+generateShortname(size);
				size++;
			} while (~_ignores.indexOf(shortname));

			_library[name] = {
				shortname: shortname,
				hits: dontCount ? 0 : 1
			};
		} else {
			shortname = name;
		}

		return shortname;
	};

	/**
	 * Returns all of the shortnames in the library.
	 * Does not count towards usage.
	 *
	 * @returns {array} Of all shortnames.
	 */
	this.getAll = function() {
		return _.pluck(_library, 'shortname');
	};

	/**
	 * Retrieves shortnames which are not used in the code processed.
	 *
	 * @returns {array} Of unused names
	 */
	this.getUnused = function() {
		return _.pluck(
			_.filter(
				_library,
				function(entry) {
					return entry.hits === 0;
				}), 'shortname');
	};

	/**
	 * Returns the size of the library.
	 *
	 * @returns {number} Number of entries in the library
	 */
	this.size = function() {
		return size;
	};

	/**
	 * Returns the full selector names which have been entered so far.
	 *
	 * @returns {Array} All full selector names
	 */
	this.getFullNames = function() {
		return Object.keys(_library);
	};

	this.stats = function() {
		return {
			size: this.size(),
			unused: this.getUnused().length
		};
	}
}
