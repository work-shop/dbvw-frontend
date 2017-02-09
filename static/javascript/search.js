"use strict";

module.exports = function( $, configuration ) {

	var base = configuration.remote_api;
	var responses;
	var totalResponses = 5;


	//initialize search processes
	function initialize(){
		
		console.log('initialize search');

		$( document ).ready( function() {

			searchToggle();

			$(".search-toggle").click(function(e){
				e.preventDefault();
				searchToggle();	
			});

			$('#search-button').click(function( event ) {
				console.log('search submit');
				validate();
				event.preventDefault();								
			});

			$('#search-input').keypress(function (e) {
				var key = e.which;
				if(key === 13) {
					validate();
					return false;  
				}
			}); 			

		});

	}


	function searchToggle(){

		console.log('search toggle');

		if($('body').hasClass('search-off')){
			$('#search-modal').removeClass('off').addClass('on');
			$('body').removeClass('search-off').addClass('search-on');
			$('#search-input').focus();
		} else {
			$('#search-modal').removeClass('on').addClass('off');
			$('body').removeClass('search-on').addClass('search-off');			
		}	

	}


	function validate(){

		var query = $('#search-input').val();

		if( typeof query !== 'undefined' && query.length >= 2 ){
			search(query);
		} else{
			console.log('search query did not validate');
		}

	}


	function search( query ){
		console.log('search for: ' + query);

		responses = 0;
		toggleSearchState();

		//info pages
		//categories
		//projects
		//news
		//jobs

	}


	function toggleSearchState(){

		console.log('toggle search state');

		if( $('body').hasClass('searching') ){
			$('body').removeClass('searching');
			console.log('not searching');
		} else {
			$('body').addClass('searching');
			console.log('searching');			
		}

	}


	function searchRequest( term ){

		var endpoint = base + term;

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function(data) {
			console.log("successful search request");
			// renderSearchResults(data);
		})
		.fail(function() {
			console.log("error on search request");
		})
		.always(function() {
			console.log("completed search request");
		});
		
	}


	function renderSearchResults( data ){

		responses++;

		if( responses === totalResponses ){
			toggleSearchState();
		}

	}


	//return on object with the initialize function
	return {
		initialize: initialize
	};

};

