"use strict";

//configuration
var configuration = require('../../package.json').frontend;


//get third party libraries
var $ = require('jquery');
var slick = require('slick-carousel');

//assign jquery to the window, so it can be accessed in the console
window.$ = $;

//get utilities
var jumpUtilities = require('./jump-utilities.js')($);
var loading = require('./loading.js')($);
var slideshows = require('./slideshows.js')($, slick);
var modals = require('./modals.js')($);
var menuUtilities = require('./menu-utilities.js')($);
var stickyNav = require('./sticky-nav.js')($);


//setup utilities
jumpUtilities.setupJumpEvents('.jump', 75, 567, 50, true);
jumpUtilities.setupJumpEvents('.spy-link', 134, 567, 50, false);
loading.setupLoading();
slideshows.setupSlideshows();
modals.setupModals();
menuUtilities.setupMenus();


//site
var timeline = require('./timeline.js')($);
timeline.setupTimeline();
var awardsToggle = require('./awards-toggle.js')($);
awardsToggle.setupAwardsToggle();
var search = require('./search.js')($, configuration);
search.initialize();




//page specific
if($('body').hasClass('page-about')){
	var scrollSpy = require('./scroll-spy.js')($);	
	scrollSpy.initialize('.spy-start', '.spy-target', '.spy-link', 135);
	var aboutNav = require('./about-nav.js')($);
	aboutNav.setupAboutNav();
}


if($('body').hasClass('page-work')){
	var Isotope = require('isotope-layout');
	var iso = require('./iso.js')($, Isotope);
	iso.initialize();
	stickyNav.initialize('#projects-filters', 75, 50);
}


if($('body').hasClass('page-project')){
	var relatedProjects = require('./related-projects.js')($, configuration);
	relatedProjects.initialize();
} else{
	//if it's not a project, reset the locally stored category
	var localStorageName = 'dbvwArchitectsCategoryName';
	localStorage.setItem(localStorageName, 'all');	
}

//page specific
if($('body').hasClass('page-contact')){
	var thankYou = require('./thank-you.js')($);	
	thankYou.setupThankYou();
}




