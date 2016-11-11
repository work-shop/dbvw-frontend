

var configuration = require('../../package.json').frontend;

var $ = require('jquery');

var jumpUtilities = require('./jump-utilities.js')($);

var slideshows = require('./slideshows.js')($);



jumpUtilities.setupJumpEvents('.jump');
