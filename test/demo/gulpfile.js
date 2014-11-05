var gulp = require('gulp'),
	gms = require('../../index.js');

gulp.task('css-and-html', function() {
	return gulp.src(['./src/css-and-html-sample.html'])
		.pipe(gms.minify({
			css: ['html']
		}, {
			classes: ['class-a']
		}))
		.pipe(gulp.dest('./dist'));
});