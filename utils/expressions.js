/**
 * Some awesome expressions that I'll explain in a bit.
 * Test these dope boats live on http://scriptular.com/ to make your life easier.
 */
module.exports = {
	/**
	 * Selector should match any classes and ids defined in a stylesheet.
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
	 * - other stupid stuff...I dunno check the tests
	 */
	selector: /(\.|#)(-?[_a-zA-Z]+[_\w-]*)\s*;*}*/g,
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
	selectorName: /(-?[_a-zA-Z]+[_\w-]*)/g,
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
	elementAttribute: /(class|id|for)\s*=\s*["'](-?[_a-zA-Z]+[_\w-\s]*)["']/g
};