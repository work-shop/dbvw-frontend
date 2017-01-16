"use strict";

module.exports = function( $ ){

	var aboutNav = {};
	aboutNav.element = $('#about-nav');
	aboutNav.referenceElement = $('#introduction');
	var offset = aboutNav.referenceElement.height();
	var navHeight = 75;
	aboutNav.triggerPosition = offset;


	function calculateNavPosition(){
		offset = aboutNav.referenceElement.height();
		aboutNav.triggerPosition = offset;
	}


	function checkNavPosition(){

		console.log('$(window).scrollTop():' + $(window).scrollTop());

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

		// $('html,body').on({ 'touchmove': function(e) { 
		// 	window.requestAnimationFrame(checkNavPosition); 
		// }});

		document.body.addEventListener("touchmove", touchMove, false);


		$( window ).scroll( function(e) {
			console.log('window.scroll');
			e.preventDefault();
			//window.requestAnimationFrame(checkNavPosition);	
		});

		$( window ).resize( function() {
			window.requestAnimationFrame(calculateNavPosition);	
			window.requestAnimationFrame(checkNavPosition);	
		});		

	}

	function touchMove(event){
		console.log('touchmove');
		window.requestAnimationFrame(checkNavPosition);	
		$('body').addClass('touchmoved');
	}


	//return an object with methods that correspond to above defined functions
	return {
		checkNavPosition: checkNavPosition,
		setupAboutNav: setupAboutNav
	};

};