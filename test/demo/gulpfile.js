var gulp = require('gulp'),
	gs = require('../../index.js');

gulp.task('default', ['css-and-html']);

gulp.task('css-and-html', function() {
	return gulp.src(['./src/css-and-html-sample.html'])
		.pipe(gs.run({
			css: ['html']
		}, {
			classes: ['class-a']
		}))
		.pipe(gs.info())
		.pipe(gulp.dest('./dist'));
});