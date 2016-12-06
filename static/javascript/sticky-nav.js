"use strict";

module.exports = function( $ ){

	var stickyNav = {};
	var activated = false;


	function initialize( selector, navHeight ){

		stickyNav.selector = selector;
		stickyNav.navHeight = navHeight;

		calculatePositions();

		if( activated === false ){
			activate();
			activated = true;
		}		
	}


	function calculatePositions(){
		stickyNav.element = $(stickyNav.selector);
		stickyNav.offset = stickyNav.element.offset();
		stickyNav.offset = stickyNav.offset.top;
		//console.log('element.offset.top = ' + stickyNav.offset); 
		stickyNav.triggerPosition = stickyNav.offset - stickyNav.navHeight;		
	}


	function checkNavPosition(){

		if( $(window).width() > 768){
			console.log('checkNavPosition with stickyNav.triggerPosition: ' + stickyNav.triggerPosition);
			if ( $('body').scrollTop() >= stickyNav.triggerPosition && stickyNav.element.hasClass('static') ){
				toggleNav();
			}else if($('body').scrollTop() < stickyNav.triggerPosition && stickyNav.element.hasClass('fixed') ){
				toggleNav();
			}			
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

		$('body').on({ 'touchmove': function(e) { window.requestAnimationFrame(checkNavPosition); } });

		$( window ).scroll( function() {
			window.requestAnimationFrame(checkNavPosition);
		});

		$( window ).resize( function() {
			window.requestAnimationFrame(calculatePositions);
		});		

	}


	//return an object with methods that correspond to above defined functions
	return {
		initialize: initialize,
		checkNavPosition: checkNavPosition,
		activate: activate
	};

};