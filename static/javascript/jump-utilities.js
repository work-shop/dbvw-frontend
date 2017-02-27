"use strict";

var modals = require('./modals.js')($);

module.exports = function( $ ) {

	function jump(destination, offset, speed){
		if(!speed){
			speed = 1500;
		}

		$('html,body').animate({
			scrollTop: $(destination).offset().top - offset
		},speed);

	}

	function setupJumpEvents( selector, offset, mobileBreakpoint, offsetMobile, preventUrl ) {

		$( document ).ready( function() {

			urlCheck();

			$(selector).click(function(e){
				
				if(preventUrl){
					e.preventDefault();
				}

				var href = $(this).attr("href").toLowerCase();

				if( $(window).width() > mobileBreakpoint){
					jump(href, offset);	
				} else{
					jump(href, offsetMobile);	
				}
			});

		});

	}

	function urlCheck(){

		//console.log('urlCheck');
		var hash = window.location.hash;

		if( $('body').hasClass('page-about') ){

			if( hash.includes('#people=') ){

				var person = hash.split('=');
				console.log(person[1]);
				$('html,body').animate({
					scrollTop: $('#people').offset().top - 125
				},0);
				modals.modalToggle('modal-person-' + person[1]);

			} else if( hash.includes('#profile') || hash.includes('#people') || hash.includes('#services') || hash.includes('#clients') || hash.includes('#history') || hash.includes('#awards') || hash.includes('#careers')){

				setTimeout(function() {
					$('html,body').animate({
						scrollTop: $(hash).offset().top - 124
					},250);
				}, 250);

			}			
		}


		
	}	

	return {
		jump: jump,
		setupJumpEvents: setupJumpEvents
	};
};