"use strict";

var _ = require('underscore');
var async = require('async');

module.exports = function( $, configuration ) {

	var base = configuration.remote_api;
	var responseCount;
	var resultsCount;	
	var searching = false;
	var totalResponses = 2;
	var $searchButton = $('#search-button');
	var $searchInput = $('#search-input');
	var $searchInformationMessage = $('#search-information-message');
	var $resultsContainer = $('#search-results');
	var $categoriesContainer = $('#results-categories');
	var $projectsContainer = $('#results-projects');
	var $newsContainer = $('#results-news');
	var $infoContainer = $('#results-info');	
	var $aboutContainer = $('#results-about');
	var m1 = '<div class="col-xs-12 search-result"><a href="';
	var m3 = '" ><h4>';
	var m5 = '</h4><h3>';
	var m7 = '</h3></a></div>';


	//initialize search processes
	function initialize(){

		console.log('initialize search');

		$( document ).ready( function() {

			//searchModalToggle();

			$(".search-toggle").click(function(e){
				e.preventDefault();
				searchModalToggle();	
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


	function searchModalToggle(){

		console.log('search modal toggle');

		if($('body').hasClass('search-off')){
			$('#search').removeClass('off').addClass('on');
			$('body').removeClass('search-off').addClass('search-on');
			$('#search-input').focus();
		} else {
			$('#search').removeClass('on').addClass('off');
			$('body').removeClass('search-on').addClass('search-off');	
			$('body').removeClass('search-after').addClass('search-before');		
		}	

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
			$searchInformationMessage.text('Searching . . .');
			$('body').removeClass('search-before').addClass('search-after');
			console.log('searching');									
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
		responseCount = 0;	
		resultsCount = 0;
		$('.search-result').remove();	
		toggleSearchState();

		//projects request 1
		// var projectRequests = [
		// '/projects?search=' + query,
		// '/projects?filter[meta_key]=short_description&filter[meta_value]=' + query + '&filter[meta_compare]=LIKE'
		// ];
		//projects request 2
		var categoriesRequest = [
		'/project_categories?search=' + query
		];		
		async.map( categoriesRequest, searchRequest, function(err, results) {
			console.log('categoriesRequests returned');
			var categoriesResults = concatResults( results );
			categoriesResults = unionResults( categoriesResults );
			renderSearchResults( categoriesResults, 'category' );
		});

		var projectRequests = [
		'/projects?search=' + query
		];		
		async.map( projectRequests, searchRequest, function(err, results) {
			console.log('projectRequests returned');
			var projectResults = concatResults( results );
			projectResults = unionResults( projectResults );
			renderSearchResults( projectResults, 'projects' );
		});				

	}



	function searchRequest( term, callback ){

		console.log('searchRequest for: ' + term);

		var endpoint = base + term;

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function(data) {
			callback( null, data );
		})
		.fail(function( err ) {
			//console.log("error on search request");
			console.error( err );
			callback( new Error('Could not resolve search request') );
		})
		.always(function() { 
			//console.log("completed search request");
		});
		
	}


	function renderSearchResults( results, resultType ){

		responseCount++;
		resultsCount += results.length;

		for (var i = 0; i < results.length; i++) {
			generateMarkup( results[i], resultType );
		}

		if( responseCount === totalResponses ){
			console.log('all responses returned');
			toggleSearchState(); 
			$searchInformationMessage.text(resultsCount + ' results found');
		}

	}


	function concatResults( results ){
		var concatResults = results.reduce( function( a,b ) {
			return a.concat( b );
		}, []);
		return concatResults;
	}


	function unionResults( results ){
		var unionResults = _.uniq(results, function( project ){
			return project.id;
		});
		return unionResults;
	}


	function generateMarkup( result, type ){
		var m2,m4,m6;

		if( type === 'category'){
			m2 = '/work/' + result.slug;
			m6 = result.name;
		} else {
			m2 = result.link;
			m6 = result.title.rendered;
		}
		var m4 = type;

		var markup = m1+m2+m3+m4+m5+m6+m7;

		setTimeout(function() {
			$projectsContainer.append( markup );
		}, 10);

	}


	//return on object with the initialize function
	return {
		initialize: initialize
	};

};

