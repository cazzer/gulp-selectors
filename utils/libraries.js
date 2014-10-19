var generateShortname = require('./generate-shortname');

var libraries = {};

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
		length = 0;


	function set(name) {
		var added = true;
		if (_library[name]) {
			added = false;
		}
		_library[name] = {
			shortname: generateShortname(length),
			hits: 0
		};
		if (added) {
			length++;
		}
		return _library[name];
	};

	Library.has = function() {
		return _library[name] ? true : false;
	};

	Library.get = function(name, dontHit) {
		//if it doesn't exist, add it
		if (!_library[name]) {
			return set(name);
		}
		//hit it unless
		if (!dontHit) {
			_library[name].hits++;
		}
		return _library[name];
	};

	Library.getAll = function() {
		return _library;
	};

	Library.length = function() {
		return length;
	};

	return Library;
};