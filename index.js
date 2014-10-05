"use strict";

var util = require('util');
var path = require('path');
var printf = require('printf');
var notifier = require('node-notifier')();

var Mocha = require('mocha');
var Base = Mocha.reporters.Base;

function image(name) {
	return path.join(__dirname, 'imgs', name + '.png');
}

function notify(stats, runner) {
	var options = NotifyReporter.options;

	// include total to stats for conviniance
	stats.total = runner.total;

	if (stats.failures) {
		options.icon = NotifyReporter.icon_fail;
		options.title = printf(NotifyReporter.title_fail, stats);
		options.message = printf(NotifyReporter.message_fail, stats);
	} else {
		options.icon = NotifyReporter.icon_pass;
		options.title = printf(NotifyReporter.title_pass, stats);
		options.message = printf(NotifyReporter.message_pass, stats);
	}

	notifier.notify(options);
}

// hacky way of getting the other reporter.. :P
function getReporter(reporter) {
	var temp = {};
	Mocha.prototype.reporter.call(temp, reporter);
	return temp._reporter;
}

function NotifyReporter(runner) {
	Base.call(this, runner);
	runner.on('end', function() {
		notify(this.stats, runner);
	}.bind(this));
}
NotifyReporter.prototype.__proto__ = Base.prototype;
module.exports = NotifyReporter;

// options for node-notifier
NotifyReporter.options = {};
// notification icons
NotifyReporter.icon_pass = image('pass');
NotifyReporter.icon_fail = image('fail');
// notification titles
NotifyReporter.title_pass = 'Passed';
NotifyReporter.title_fail = 'Failed';
// notification messages
NotifyReporter.message_pass = '%(passes)d tests passed in %(duration)dms';
NotifyReporter.message_fail = '%(failures)d of %(total)d tests failed';

// Tries to decorate other reporter with notifications
// Borrows Mochas reporter method
NotifyReporter.decorate = function(reporter) {
	return function(runner) {
		reporter = new (getReporter(reporter))(runner);
		runner.on('end', function() {
			notify(reporter.stats, runner);
		});
		return reporter;
	};
};
