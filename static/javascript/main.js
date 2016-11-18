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


//setup utilities
jumpUtilities.setupJumpEvents('.jump', 75);
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
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 75);
	var aboutNav = require('./about-nav.js')($);
	aboutNav.setupAboutNav();
}

//page specific
if($('body').hasClass('page-work')){
	var Isotope = require('isotope-layout');
	var iso = require('./iso.js')($, Isotope);
	iso.setupIso();
}




