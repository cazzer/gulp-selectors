var _ = require('lodash');

module.exports = {
	mapNames: mapProcessorNames,
	getForExtension: getProcessorsForExtension
};

function mapProcessorNames(processors) {
	//add defaults
	processors = _.extend({
		css: ['css'],
		html: ['html']
	}, processors);
	//rename css and html to local modules
	processors['../replacers/css'] = processors.css;
	processors.css = false;
	processors['../replacers/html'] = processors.html;
	processors.html = false;

	return processors;
}

function getProcessorsForExtension(processors, extension) {
	var selectedProcessors = [];

	for (var processor in processors) {
		if (typeof processors[processor] === 'object' &&
			processors[processor].indexOf(extension) > -1) {
			selectedProcessors.push(require(processor));
		}
	}

	return selectedProcessors;
}