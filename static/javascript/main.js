"use strict";

//configuration
//var configuration = require('../../package.json').frontend;


//third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');


//utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var menuUtilities = require('./menu-utilities.js')($);
var slideshows = require('./slideshows.js')($, slick);
var modals = require('./modals.js')($);


//setup
jumpUtilities.setupJumpEvents('.jump', 75);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();


//site
var timeline = require('./timeline.js')($);
var awardsToggle = require('./awards-toggle.js')($);


timeline.setupTimeline();
awardsToggle.setupAwardsToggle();


//spy
if($('body').hasClass('aboutNav')){
	var scrollSpy = require('./scroll-spy.js')($);	
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 75);
	var aboutNav = require('./about-nav.js')($);
	aboutNav.setupAboutNav();
}
