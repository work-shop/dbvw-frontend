"use strict";

module.exports = function($) {

	//open and close the menu
	function menuToggle(){

		if($('body').hasClass('menu-closed')){
			$('#menu').removeClass('closed');
			$('#menu').addClass('open');
			$('body').removeClass('menu-closed');
			$('body').addClass('menu-open');
		}
		else if($('body').hasClass('menu-open')){
			$('#menu').removeClass('open');
			$('#menu').addClass('closed');
			$('body').removeClass('menu-open');
			$('body').addClass('menu-closed');
		}

	}

	//set up the menu and events that interact with it 
	function setupMenus() {

		$( document ).ready( function() {
			$('.menu-toggle').click(function(e) {
				e.preventDefault();
				menuToggle();
			});			
		});

	}

	return {
		menuToggle: menuToggle,
		setupMenus: setupMenus
	};
	
};