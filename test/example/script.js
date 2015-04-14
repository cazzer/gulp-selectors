(function() {
	wiggle(document.getElementById('wiggle'), 0);

	function wiggle(element, time) {
		element.style.marginLeft = Math.sin(time) * 10;
		time += .1;
		setTimeout(wiggle.bind(this, element, time), 10);
	}
})();