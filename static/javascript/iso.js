"use strict";

module.exports = function( $, Isotope ) {


	var iso;
	var grid = document.querySelector('#grid');	
	var $filters = $('.filters');
	var $workIntroductions = $('.work-introduction-category');
	var $buttonGroup = $('.button-group');
	var $categoryLabel = $('.category-label');
	var initialized = false;


	//initialize
	function initialize(){

		//when the window is loaded, create isotope
		$(window).on("load", function() {

			//create isotope
			iso = new Isotope( grid, {
				itemSelector: '.grid-item',
				transitionDuration: '0.5s',
				masonry: {
					columnWidth: '.grid-sizer',
					gutter: '.gutter-sizer'
				},				
				getSortData: {
					number: '[data-order]',
					featured: function(itemElem) {
						var order = $(itemElem).attr('data-sort');
						return parseInt(order);
					}
				},
				hiddenStyle: {
					opacity: 0
				},
				visibleStyle: {
					opacity: 1
				}
			});

			//get initial category state
			var initialCategory = $filters.data('category-start');

			//filter to initial category state
			filter( initialCategory );

			bindEvents();

		});

	}


	//filter projects
	function filter( category ){

		//before filtering, clear all filtering and sorting overrides
		$('.featured').removeClass('featured-active'); //reset all featured projects to their non-filtered state
		$('.featured').attr('data-sort', 2 ); // return all featured projects to their initial sort state	

		//isotope filtering
		iso.arrange({

			  // item element provided as argument
			  filter: function( itemElem ) {

			  	var $featuredItem = $('.featured-' + category);
			  	var $itemElem = $(itemElem);

			  	if( $featuredItem.attr('id') === $itemElem.attr('id') ){
			  		console.log('this is the featured item:' + $featuredItem.attr('id'));
			  		$featuredItem.addClass('featured-active');
			  		$featuredItem.attr('data-sort', 1 );
			  	}

			  	//check if the element has a class matching the category we're filtering to
			  	var flag = $itemElem.hasClass(category);		  	
			  	return flag;
			  }
			});		

		sort( category );

	}


	//sort 
	function sort( category ){
		
		iso.updateSortData();
		iso.arrange({
			sortBy: 'featured',
			sortAscending: true
		});		

		update( category );
	}


	//update the view
	function update( category ){

		var currentIntroduction = '.work-introduction-category-' + category;

		$workIntroductions.filter('.active').removeClass('active').addClass('inactive');
		$(currentIntroduction).removeClass('inactive').addClass('active');		
		var stateObj = {};

		//apply global classes to manage what the specifics of the category we're viewing
		if( category !== 'all' ){
			console.log('category =' + category);

			stateObj.category = category;

			$('body').addClass('category-filtered');			
			if(initialized){
				$categoryLabel.text(category);
				var newUrl = '/work/' + category;
				history.pushState( stateObj, '', newUrl );		
			} else{

			}
		} 
		else if ( category === 'all' ){
			console.log('category = all');

			stateObj.category = 'all';

			$('body').removeClass('category-filtered');			
			if(initialized){
				$categoryLabel.text('Category');
				var newUrl = '/work';
				history.pushState( stateObj, '', newUrl );			
			} else{
				console.log('not initialized');
				
			}

		}		

		//jump to the top of the page
		$('html,body').animate( { scrollTop: 0 }, 250 );

		if( !initialized ){
			initialized = true;
		}			

	}


	//bind events
	function bindEvents(){

		$('.filters').on( 'click', '.filter-button', function(event) {
			event.preventDefault();
			var category = $( this ).attr('data-filter');	
			filter(category);				
		});	 

		$('.button-group').each( function( i ) {
			$buttonGroup.on( 'click', '.filter-button', function(event) {
				event.preventDefault();
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});

		});	

		window.onpopstate = function(event){
			filter(event.state.category);
		};

	}
	
	
	return {
		initialize: initialize
	};

};

