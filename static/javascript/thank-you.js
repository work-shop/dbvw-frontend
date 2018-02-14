"use strict";

module.exports = function( $ ){

	function checkUrl(){

		if(window.location.hash) {
		var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		return hash;
	}

}


function displayThankYou(){
	console.log('displayThankYou');
	$('#contact-thank-you').removeClass('hidden');
}


function setupThankYou() {

	$( document ).ready( function() {

		if( checkUrl() === 'thanks' ){
			displayThankYou();
		}

		$('#contact-thank-you').click(function(event) {
			$('#contact-thank-you').addClass('hidden');
			window.location.hash = '';
		});

		$('#e2ma_signup_submit_button').val('Sign Up ->');

	});

}


	//return an object with methods that correspond to above defined functions
	return {
		setupThankYou: setupThankYou
	};

};