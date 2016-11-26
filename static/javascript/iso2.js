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

		console.log('initialize');		

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

		console.log('filter');		

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
		
		console.log('sort');

		iso.updateSortData();
		iso.arrange({
			sortBy: 'featured',
			sortAscending: true
		});		

		update( category );
	}


	//update the view
	function update( category ){

		console.log('update');

		var currentIntroduction = '.work-introduction-category-' + category;

		$workIntroductions.filter('.active').removeClass('active').addClass('inactive');
		$(currentIntroduction).removeClass('inactive').addClass('active');		


		//apply global classes to manage what the specifics of the category we're viewing
		if( category !== 'all' ){
			$('body').addClass('category-filtered');			
			if(initialized){
				$categoryLabel.text(category);	
			}		
		} 
		else if ( category === 'all' ){
			$('body').removeClass('category-filtered');			
			if(initialized){
				$categoryLabel.text('Category');	
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

		console.log('bindEvents');

		$('.filters').on( 'click', 'button', function() {
			var category = $( this ).attr('data-filter');	
			filter(category);
		});	 

		$('.button-group').each( function( i ) {
			$buttonGroup.on( 'click', 'button', function() {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});

		});	

	}
	
	
	return {
		initialize: initialize
	};

};

