"use strict";

//configuration
var configuration = require('../../package.json').frontend;


//third party libraries
var $ = require('jquery');


//utilities
var jumpUtilities = require('./jump-utilities.js')($);


//site
var slideshows = require('./slideshows.js')($);



//setup
jumpUtilities.setupJumpEvents('.jump');

