"use strict";

module.exports = function( $ ){

	var aboutNav = {};
	aboutNav.element = $('#about-nav');
	var offset = aboutNav.element.offset();
	offset = offset.top;
	var navHeight = 81;
	aboutNav.triggerPosition = offset - navHeight;


	function checkNavPosition(){

		if ( $(window).scrollTop() >= aboutNav.triggerPosition && aboutNav.element.hasClass('static') ){
			toggleNav();
		}else if($(window).scrollTop() < aboutNav.triggerPosition && aboutNav.element.hasClass('fixed') ){
			toggleNav();
		}

	}


	function toggleNav(){

		if ( aboutNav.element.hasClass('static') ){
			aboutNav.element.removeClass('static').addClass('fixed');
			$('body').addClass('about-nav-fixed');
		}else if( aboutNav.element.hasClass('fixed') ){
			aboutNav.element.removeClass('fixed').addClass('static');
			$('body').removeClass('about-nav-fixed');			
		}	

	}


	function setupAboutNav() {

		$( window ).scroll( function() {
			window.requestAnimationFrame(checkNavPosition);	
		});

	}


	//return an object with methods that correspond to above defined functions
	return {
		checkNavPosition: checkNavPosition,
		setupAboutNav: setupAboutNav
	};

};