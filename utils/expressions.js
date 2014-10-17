/**
 * Some awesome expressions that I'll explain in a bit.
 */
module.exports = {
	selector: /(\.|#)(-?[_a-zA-Z]+[_\w-]*)\s*;*}*/g,
	selectorName: /(-?[_a-zA-Z]+[_\w-]*)/g,
	selectorAttribute: /(class|id|for)\s*=\s*["'](-?[_a-zA-Z]+[_\w-\s]*)["']/g
};