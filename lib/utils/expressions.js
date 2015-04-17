var selectorName = '(-?[_a-z]+[_\\w-]*)';
var selectorSuffix = '((?=[\\s:#\\.\\{,\\>\\~+\\[\\]]))(?=(?:.|\n|\r)*{)';

/**
 * Some awesome expressions that I'll explain in a bit.
 * Test these dope boats live on http://scriptular.com/ to make your life easier.
 */
module.exports = {
	/**
	 * Selector name extracts valid selector names from selectors. Basically we use the selector
	 * expression to find the selectors, then use this to extract the actual name which need to be
	 * shortened.
	 *
	 * Should match:
	 * - selector
	 * - -selector
	 * - _selector
	 * - selector0
	 *
	 * Shouldn't match:
	 * - 3selector
	 * - :selector
	 */
	selectorName: new RegExp(selectorName, 'g'),
	/**
	 * Selectors should match any classes and ids defined in a stylesheet.
	 *
	 * NOTE: This will also match hex values but will capture the close ; or } so that it can be
	 * ignored later.
	 *
	 * Should match:
	 * - #selector
	 * - .selector
	 * - #e6e6e6;
	 *
	 * Shouldn't match:
	 * - body
	 * - #666
	 * - :pseudo
	 * - url('foobar.classname')
	 * - other stupid stuff...I dunno check the tests
	 */
	classSelector: new RegExp('(\\.|\\[class[\\^\\$\\|\\*]?=)' + selectorName + selectorSuffix, 'gi'),
	idSelector: new RegExp('(#|\\[id[\\^\\$\\|\\*]?=)' + selectorName + selectorSuffix, 'gi'),
	/**
	 * Matches HTML class, id, and for attributes. I think those are the only ones we care about...
	 *
	 * NOTE: This expression should also match attributes with spaces between the assignment, e.g.
	 *
	 * Should match:
	 * - class="selector"
	 * - class="selector selector"
	 * - id="selector"
	 * - for="selector"
	 *
	 * Shouldn't match:
	 * - name="selector"
	 * - href="selector"
	 */
	elementAttribute: /(class|id|for)\s*=\s*["'](-?[_a-zA-Z]+[_\w-\s]*)["']/g,
	/**
	 * Matches ID Values
	 * 
	 * All values can be single values or lists and lists can be either comma separated (each val is surrounded by single or double quotes OR a space separated list with not internal quotes (only quotes at beginning and end).
	 * .getElementById 
	 * .id
	 * $ Only matches values with "#"
	 * jQuery Only matches values with "#"
	 * .attr This has a known bug. There is no way to differentiate the leading "class" from "id" in attr without look-behind, which javascript does not support. Therefore, all matches using this regex need to be filtered to remove results which are lists that have "class" as the first value.
	 */
	idList: /(?:\$|jQuery|(?:\.(?:getElementById|id|jQuery|attr)))\s*[\(=]{1}\s*(["']{1}#?-?[_a-zA-Z]+[_\w-]*(?:(?:(?:["']{1}\s*,\s*["']{1})|\s+){1}#?-?[_a-zA-Z]+[_\w-]*)*["']{1})/,
	/**
	 * Matches Class Values
	 *
	 * All values can be single values or lists and lists can be either comma separated (each val is surrounded by single or double quotes OR a space separated list with not internal quotes (only quotes at beginning and end).
	 * .getElementsByClassName
	 * .classList.add
	 * .classList.remove
	 * .className
	 * $ Only matches values with "."
	 * jQuery Only matches values with "."
	 * .addClass
	 * .toggleClass
	 * .removeClass
	 * .attr This has a known bug. There is no way to differentiate the leading "class" from "id" in attr without look-behind, which javascript does not support. Therefore, all matches using this regex need to be filtered to remove results which are lists that have "id" as the first value.
	 * .hasClass
	 */
	classList: /(?:\$|jQuery|(?:\.(?:getElementsByClassName|classList\.add|classList\.remove|className|jQuery|addClass|toggleClass|removeClass|attr|hasClass)))\s*[\(=]{1}\s*(["']{1}\.?-?[_a-zA-Z]+[_\w-]*(?:(?:(?:["']{1}\s*,\s*["']{1})|\s+){1}\.?-?[_a-zA-Z]+[_\w-]*)*["']{1})/,
	/**
	 * Builds a regular expression which will match a quoted string.
	 *
	 * @param name String of selector name
	 * @returns {RegExp}
	 */
	jsString: function(name) {
		return new RegExp('[\'|"]' + name + '[\'|"]', 'g');
	}
};
