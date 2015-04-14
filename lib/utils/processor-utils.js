var _ = require('lodash');

module.exports = {
	extendDefaults: extendDefaults,
	getForExtension: getProcessorsForExtension
};

function extendDefaults(processors) {

	processors = _.extend({
		css: ['css'],
		html: ['html']
	}, processors);

	return processors;
}

function getProcessorsForExtension(processors, extension) {
	var selectedProcessors = [];

	for (var processor in processors) {
		if (typeof processors[processor] === 'object' &&
			processors[processor].indexOf(extension) > -1) {
			switch (processor) {
				//these guys are special since they're built in
				case 'css':
				case 'html':
				case 'js-strings':
				case 'remove-unused':
					selectedProcessors.push(require('../processors/' + processor));
					break;
				default:
					selectedProcessors.push(require(processor));
			}
		}
	}

	return selectedProcessors;
}