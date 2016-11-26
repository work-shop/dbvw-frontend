"use strict";

//configuration
//var configuration = require('../../package.json').frontend;


//get third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');


//get utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var menuUtilities = require('./menu-utilities.js')($);
var slideshows = require('./slideshows.js')($, slick);
var modals = require('./modals.js')($);
var stickyNav = require('./sticky-nav.js')($);


//setup utilities
jumpUtilities.setupJumpEvents('.jump', 75);
jumpUtilities.setupJumpEvents('.spy-link', 125);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();


//site
var timeline = require('./timeline.js')($);
timeline.setupTimeline();
var awardsToggle = require('./awards-toggle.js')($);
awardsToggle.setupAwardsToggle();



//page specific
if($('body').hasClass('page-about')){
	var scrollSpy = require('./scroll-spy.js')($);	
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 125);
	stickyNav.initialize('#about-nav', 80);
	//stickyNav.initialize('#people-statement', 0);	
}

//page specific
if($('body').hasClass('page-work')){
	var Isotope = require('isotope-layout');
	var iso = require('./iso2.js')($, Isotope);
	iso.initialize();
	stickyNav.initialize('.filters', 50);
}




