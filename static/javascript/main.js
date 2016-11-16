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
var scrollSpy = require('./scroll-spy.js')($);
var modals = require('./modals.js')($);


//setup
jumpUtilities.setupJumpEvents('.jump', 75);
loading.setupLoading();
slideshows.setupSlideshows();
menuUtilities.setupMenus();
modals.setupModals();


//site
var aboutNav = require('./about-nav.js')($);
var awardsToggle = require('./awards-toggle.js')($);

aboutNav.setupAboutNav();
awardsToggle.setupAwardsToggle();

if($('body').hasClass('spy')){
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 75);
}
