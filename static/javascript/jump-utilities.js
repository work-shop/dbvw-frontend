"use strict";

module.exports = function( $ ) {

	function jump(destination, offset, speed){
		if(!speed){
			speed = 1500;
		}
		$('html,body').animate({
			scrollTop: $(destination).offset().top - offset
		},speed);

	}

	function setupJumpEvents( selector, offset ) {

		$( document ).ready( function() {
			$(selector).click(function(e){
				e.preventDefault();
				var href = $(this).attr("href").toLowerCase();
				jump(href, offset);	
			});
		});

	}

	return {
		jump: jump,
		setupJumpEvents: setupJumpEvents
	};
};