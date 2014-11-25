var gulp = require('gulp'),
	gm = require('../../index.js');

gulp.task('default', ['css-and-html']);

gulp.task('css-and-html', function() {
	return gulp.src(['./src/css-and-html-sample.html'])
		.pipe(gm.run({
			css: ['html']
		}, {
			classes: ['class-a']
		}))
		.pipe(gm.info())
		.pipe(gulp.dest('./dist'));
});