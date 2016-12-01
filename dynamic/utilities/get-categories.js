"use strict";

module.exports = function() {

	return function getCategories( terms ){

		var categories = {
			slugs: '',
			names: ''
		};

		for (var i = 0; i < terms.length; i++) {
			categories.slugs += terms[i].slug;
			categories.slugs += ' ';
			categories.names += terms[i].name;
			if( i < ( terms.length - 1) ){
				categories.names += ', ';			
			}
		}

		return categories; 
	};

};
