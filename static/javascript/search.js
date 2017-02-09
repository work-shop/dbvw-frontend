"use strict";

module.exports = function( $, configuration ) {

	var base = configuration.remote_api;
	var responses;
	var searching = false;
	var totalResponses = 1;
	var $searchButton = $('#search-button');
	var $searchInput = $('#search-input');
	var $searchInformationMessage = $('#search-information-message');



	//initialize search processes
	function initialize(){
		
		console.log('initialize search');

		$( document ).ready( function() {

			searchToggle();

			$(".search-toggle").click(function(e){
				e.preventDefault();
				searchToggle();	
			});

			$searchButton.click(function( event ) {
				console.log('search submit');
				if( searching === false ){
					validate();
				}
				event.preventDefault();								
			});

			$searchInput.keypress(function (e) {
				var key = e.which;
				if(key === 13) {
					if( searching === false ){
						validate();
					}					
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
			$('body').removeClass('search-after').addClass('search-before');		
		}	

	}


	function validate(){

		var query = $searchInput.val();

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

		var requests = [
		'/projects?search=' + query
		];

		for (var i in requests) {
			var term = requests[i];
			searchRequest( term );
		}


		//info pages
		//categories
		//projects
		//news
		//jobs

	}


	function toggleSearchState(){

		console.log('toggle search state');

		if( $('body').hasClass('searching') ){
			searching = false;			
			$('body').removeClass('searching');
			console.log('not searching');
		} else {
			$('body').addClass('searching');
			searching = true;
			$('body').removeClass('search-before').addClass('search-after');
			console.log('searching');									
		}

	}


	function searchRequest( term ){

		console.log('searchRequest for: ' + term)

		var endpoint = base + term;

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function(data) {
			console.log("successful search request");
			recordResponse(true, data);
		})
		.fail(function() {
			console.log("error on search request");
			recordResponse(false);
		})
		.always(function() {
			console.log("completed search request");
		});
		
	}

	function recordResponse( status, data ){

		responses++;

		if( responses === totalResponses ){
			console.log('all responses returned');
			setTimeout(function() { toggleSearchState(); }, 3000);
			

			$searchInformationMessage.text('5 results found');

		}

	}


	function renderSearchResults( data, success ){



	}


	//return on object with the initialize function
	return {
		initialize: initialize
	};

};

