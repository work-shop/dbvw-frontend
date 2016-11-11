"use strict";

module.exports = function($) {

	function doSomething(){
	
	}

	function setupSomething() {

		$( document ).ready( function() {
			doSomething();
		});

	}

	return {
		doSomething: doSomething,
		setupSomething: setupSomething
	};
};