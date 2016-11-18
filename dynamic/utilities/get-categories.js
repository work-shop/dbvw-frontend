"use strict";

module.exports = function() {

	return function getCategories( terms ){

		var categories = '';

		for (var i = 0; i < terms.length; i++) {
			categories += 'category-';
			categories += terms[i].slug;
			categories += ' ';
		}

		return categories; 
	}

};
