"use strict";

module.exports = function( $ ){

	var stickyNav = {};
	var activated = false;


	function initialize( selector, navHeight ){
		stickyNav.element = $(selector);
		stickyNav.offset = stickyNav.element.offset();
		stickyNav.offset = stickyNav.offset.top;
		stickyNav.navHeight = navHeight;
		stickyNav.triggerPosition = stickyNav.offset - stickyNav.navHeight;

		if( activated === false ){
			activate();
			activated = true;
		}		
	}


	function checkNavPosition(){

		if ( $(window).scrollTop() >= stickyNav.triggerPosition && stickyNav.element.hasClass('static') ){
			toggleNav();
		}else if($(window).scrollTop() < stickyNav.triggerPosition && stickyNav.element.hasClass('fixed') ){
			toggleNav();
		}

	}


	function toggleNav(){

		if ( stickyNav.element.hasClass('static') ){
			stickyNav.element.removeClass('static').addClass('fixed');
			$('body').addClass('sticky-nav-fixed');
		}else if( stickyNav.element.hasClass('fixed') ){
			stickyNav.element.removeClass('fixed').addClass('static');
			$('body').removeClass('sticky-nav-fixed');			
		}	

	}


	function activate() {

		document.addEventListener("touchmove", function() { window.requestAnimationFrame(checkNavPosition); }, false);	

		$( window ).scroll( function() {
			window.requestAnimationFrame(checkNavPosition);
		});

		$( window ).scroll( function() {
			window.requestAnimationFrame(checkNavPosition);
		});

	}


	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize,
		checkNavPosition: checkNavPosition,
		activate: activate
	};

};