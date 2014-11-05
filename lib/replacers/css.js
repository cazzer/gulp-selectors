var expressions = require('../utils/expressions');

/*var idSelector = new RegExp('#{1}(-?[_a-zA-Z]+[_\w-]*)\s*;*}*', 'g'),
	classSelector = new RegExp('\.{1}(-?[_a-zA-Z]+[_\w-]*)\s*[{+|}+|:+|~+|>+|,+|\s+|[+|\++]', 'g');*/

/**
 * Replaces all class names with shortnames. Also builds a library of shortnames which can be
 * used to reduce other file types.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
module.exports =  function(file, classLibrary, idLibrary) {
	var classNameMatch = expressions.selector,
		nameMatch = expressions.selectorName;

	return file.replace(classNameMatch, function(match) {
		//exclude property values (matches ending in ';')
		if (match[match.length - 1] === ';' || match[match.length - 1] === '}') {
			return match;
		}

		//get the selector type and name
		var selectorType = match.substr(0, 1);

		return match.replace(nameMatch, function(selector) {
			switch (selectorType) {
				case '.':
					return classLibrary.get(selector, true);
				case '#':
					return idLibrary.get(selector, true);
				default:
					//probably don't touch something we don't understand
					console.log('I just found this selector type and I\'m not sure what to do with it: '
						+ selectorType);
					return selector;
			}
		});
	});
};