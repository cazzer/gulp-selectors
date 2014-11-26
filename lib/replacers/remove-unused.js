/**
 * Removes all CSS declarations in the library which are unused.
 * This doesn't get anything with a secondary selector. Help my regex!
 *
 * @param file
 * @param classLibrary
 * @returns {*}
 */
module.exports =  function(file, classLibrary) {

	classLibrary.getUnused().forEach(function(selector) {
		var expression = new RegExp('[,?\\s*]\\.' + selector + '\\s*{[^}]*}', 'g');
		file = file.replace(expression, function(match) {
			if (match[0] !== ',') {
				//remove declaration
				return '';
			} else {
				//only remove selector
				var subExpression = new RegExp('[,?\\s*]\\.' + selector);
				return match.replace(subExpression, function() {
					return '';
				});
			}
		});
	});

	return file;
};