"use strict";

module.exports = function( $ ){

	var aboutNav = {};
	aboutNav.element = $('#about-nav');
	var offset = aboutNav.element.offset();
	offset = offset.top;
	var navHeight = 75;
	aboutNav.triggerPosition = offset - navHeight;
	console.log('aboutNav.triggerPosition: ' + aboutNav.triggerPosition);


	function calculateNavPosition(){

		aboutNav.element = $('#about-nav');
		offset = aboutNav.element.offset();
		offset = offset.top;
		aboutNav.triggerPosition = offset - navHeight;
		console.log('aboutNav.triggerPosition: ' + aboutNav.triggerPosition);

	}


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

		$( window ).resize( function() {
			console.log('resize');
			window.requestAnimationFrame(calculateNavPosition);	
			window.requestAnimationFrame(checkNavPosition);	
		});		

	}


	//return an object with methods that correspond to above defined functions
	return {
		checkNavPosition: checkNavPosition,
		setupAboutNav: setupAboutNav
	};

};