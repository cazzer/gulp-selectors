# gulp-mini-selectors (gms) [![Build Status][travis-image]][travis-url]

> Minify those pesky selector names down to nothing with this fancy gulp plugin. Minified selectors
will be applied consistently across all style, html, and js files piped into it.

## Usage

If you do like dropping selectors in your JavaScript, make sure to load those files last. Currently the replace is dangerous and will have collisions if you reuse names across class and id selectors.

```js
gulp.src(['src/**/*.css', 'src/**/*.html', 'src/**/*.js'])
    .pipe(miniSelectors())
    .pipe(gulp.dest('dist'));
```

[travis-url]: https://travis-ci.org/calebthebrewer/gulp-mini-selectors
[travis-image]: https://travis-ci.org/calebthebrewer/gulp-mini-selectors.svg?branch=master
