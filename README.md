# gulp-selectors
[![Build Status][travis-image]][travis-url] [![Code Climate][cc-image]][cc-url] [![Test Coverage][coverage-image]][coverage-url] [![NPM Version][npm-image]][npm-url]

> Minify those pesky selector names down to nothing with this fancy gulp plugin. Minified selectors will be applied consistently across all files piped into it.

## Usage

```js
var gulp    = require('gulp');
var gs     = require('gulp-selectors');

gulp.src(['src/**/*.css', 'src/**/*.html'])
    .pipe(gs.run())
    .pipe(gulp.dest('dist'));
```

CSS and HTML files are handled well by default, just pass in your glob of files and all classes and IDs will be reduced to a minified form. Of course you can use it for some more specific functions if you like. See the included sample gulpfile for a full example of how to effectively use gs in your gulp workflow.

### Advanced Usage

```js
var processors: {
        'css':  ['scss', 'css'],        // run the css processor on .scss and .css files
        'html': false,                  // don't run on html files
        'js-strings':   ['js']          // run the js-strings plugin on js files
    },
    ignores: {
        classes: ['hidden', 'active']   // ignore these class selectors
    };

gs.run(processors, ignores);
```

Two processors are built in for your convenience, `css` and `html`. By the power of `regex` they will replace all conventional uses of selectors in your stylesheets and pages respectively.

- css: matches .selectors and #selectors
- html: matches id="selector"s, class="selector"s, and for="selector"s

Since `js-strings` isn't built in gs will attempt to `require` it; if it is not available an error will be thrown.

The ignore object can contain two parameters: `ids` and `classes`, each of which are an array of selectors which will not be minified by *any* processor.

## How gs works

Calling `gs.run()` builds a library which persists for all processors used in the call. Processors are run on all associated files and all selectors, besides those that have been ignored, will be minified.

### Processors

```js
{
    'css': ['css', 'scss'],
    'html': ['html', 'tpl.js'],
    'js-strings': ['js', '!tpl.js'],
    'your-custom-processor': ['.ext']
}
```

`css` and `html` are built in. Additional processors referenced will be injected where needed so it is important to ensure all are installed. Processors are used like this:

```js
processor(file, classLibrary, idLibrary)
```

`File` is the string containing the file contents. Each of the two libraries exposes the following API:

- set(selectorName): returns a minified selector name
- has(selectorName): tests if the name exists
- get(selectorName, [dontCount]): ...

```js
libraries
```

### Ignores

```js
{
    ids: ['content', 'target'],
    classes: ['hidden', 'active']
}
```


[travis-url]: https://travis-ci.org/calebthebrewer/gulp-selectors
[travis-image]: https://travis-ci.org/calebthebrewer/gulp-selectors.svg?branch=master
[cc-image]: https://codeclimate.com/github/calebthebrewer/gulp-selectors/badges/gpa.svg
[cc-url]: https://codeclimate.com/github/calebthebrewer/gulp-selectors
[coverage-image]: https://codeclimate.com/github/calebthebrewer/gulp-selectors/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/calebthebrewer/gulp-selectors
[npm-image]: http://img.shields.io/npm/v/gh-badges.svg
[npm-url]: https://npmjs.org/package/gulp-selectors
