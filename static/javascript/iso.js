"use strict";

module.exports = function( $, Isotope ) {


	var iso;
	var grid = document.querySelector('#grid');	
	var $filters = $('.filters');
	var $workIntroductions = $('.work-introduction-category');
	var $buttonGroup = $('.button-group');
	var $categoryLabel = $('.category-label');
	var stateObj = {};
	var initialized = false;



	//initialize
	function initialize(){

		//when the window is loaded, create isotope
		$(window).on("load", function() {

			//create isotope
			iso = new Isotope( grid, {
				itemSelector: '.grid-item',
				transitionDuration: '.35s',
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
		$('.featured').removeClass('featured-active');
		$('.featured').attr('data-sort', 2 ); 

		//isotope filtering
		iso.arrange({

			  // item element provided as argument
			  filter: function( itemElem ) {

			  	var $featuredItem = $('.featured-' + category);
			  	var $itemElem = $(itemElem);

			  	if( $featuredItem.attr('id') === $itemElem.attr('id') ){
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


		//apply global classes to manage what the specifics of the category we're viewing
		if( category !== 'all' ){
			
			$('body').addClass('category-filtered');

			stateObj.category = category;		
			var newUrl = '/work/' + category;

			if(initialized){
				$categoryLabel.text(category);
				updateUrl(stateObj, newUrl);
			} 

		} 
		else if ( category === 'all' ){

			$('body').removeClass('category-filtered');	

			stateObj.category = 'all';
			var newUrl = '/work';			

			if(initialized){
				$categoryLabel.text('Category');
				updateUrl(stateObj, newUrl);				
			}

		}	

		//jump to the top of the page
		$('html,body').animate( { scrollTop: 0 }, 250 );

		if( !initialized ){
			initialized = true;
		}			
	}


	//update the URL based on the category
	function updateUrl( stateObj, url ){
		history.pushState( stateObj, '', url );
	}


	//bind events
	function bindEvents(){

		$(".filter-button").click(function(e){
			e.preventDefault();
			console.log('filter button');
			var category = $( this ).attr('data-filter');	
			filter(category);	
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');	
		});

		$(".filter-dropdown-button").click(function(e){
			e.preventDefault();
		});		

		window.onpopstate = function(event){
			filter(event.state.category);
		};

	}
	

	//return on object with the initialize function
	return {
		initialize: initialize
	};

};

