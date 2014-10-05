mocha-notifier-reporter
=======================

`mocha-notifier-reporter` is a reporter that shows notification using [node-notifier](https://github.com/mikaelbr/node-notifier) with customizable values.
Default notification is similar to [Mocha](http://visionmedia.github.io/mocha/) growl option.
It can also add notifications to other [Mocha](http://visionmedia.github.io/mocha/) reporters.

Installation
------------

	npm install mocha-notifier-reporter

Usage
-----

It's easy to show notifications from [Gulp](http://gulpjs.com/) tests.

```js
var gulp = require('gulp');
var mocha = require('mocha');

// stand-alone usage
gulp.task('test-notify-only', function() {
	gulp.src('test/*.js')
		.pipe(mocha({
			reporter: 'mocha-notifier-reporter'
		}));
});
```

Use `decorate` method to use other reporter at the same time.
`decorate` takes same argument as Mocha for reporter property.

See [here](http://visionmedia.github.io/mocha/#reporters) for other possible reporters.

```js
var gulp = require('gulp');
var mocha = require('mocha');
var notifierReporter = require('mocha-notifier-reporter');

// stand-alone usage
gulp.task('test-notify-only', function() {
	gulp.src('test/*.js')
		.pipe(mocha({
			reporter: notifierReporter.decorate('spec')
		}));
});	
```

Options
-------

`mocha-notifier-reporter` has few options to change notifications behavior and looks.

```js
var notifierReporter = require('mocha-notifier-reporter');
```

`options` property is passed to [node-notifier](https://github.com/mikaelbr/node-notifier). Except `icon`, `title` and `message` options, which are overridden with values below.

```js 
notifierReporter.options = {}; // options for node-notifier
```

Change notification icons with `icon_pass` and `icon_fail` properties.

```js
notifierReporter.icon_pass = 'path to pass image';
notifierReporter.icon_fail = 'path to fail image';
```

Title and message strings are parsed using [node-printf](https://github.com/wdavidw/node-printf) with stats object.

Possible variables are:
`suites`, `tests`, `passes`, `pending`, `failures`, `total`, `start`, `end`, `duration`

```js
notifierReporter.title_pass = 'pass title'; // defaults to 'Passed'
notifierReporter.title_fail = 'fail title'; // defaults to 'Failed'
notifierReporter.message_pass = 'pass message'; // defaults to '%(passes)d tests passed in %(duration)dms'
notifierReporter.message_fail = 'fail message'; // defaults to '%(failures)d of %(total)d tests failed'

```