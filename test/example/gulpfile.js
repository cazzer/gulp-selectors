var gulp = require('gulp');
var selectors = require('../../index');

gulp.task('default', function() {
	return gulp.src(['index.html', 'style.css', 'script.js'])
		.pipe(selectors.run({
			'js-strings': ['js']
		}))
		.pipe(selectors.info())
		.pipe(gulp.dest('./dist'));
});