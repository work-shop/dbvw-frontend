"use strict";

//configuration
//var configuration = require('../../package.json').frontend;


//third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');


//utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);


//site
var slideshows = require('./slideshows.js')($, slick);


//setup
jumpUtilities.setupJumpEvents('.jump');
loading.setupLoading();
slideshows.setupSlideshows();

