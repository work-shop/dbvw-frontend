"use strict";

module.exports = function( $, Isotope ) {

	var iso;
	var grid = document.querySelector('#grid');	
	var $filters = $('.filters');
	var $workIntroductions = $('.work-introduction-category');


	//initialize
	function initialize(){

		//setup isotope
		$(window).on("load", function() {

			//create
			iso = new Isotope( grid, {
				itemSelector: '.grid-item',
				transitionDuration: '0.5s',
				hiddenStyle: {
					opacity: 0
				},
				visibleStyle: {
					opacity: 1
				},
				masonry: {
					columnWidth: '.grid-sizer',
					gutter: '.gutter-sizer'
				}
			});	

			//get initial category state
			var initialCategory = $filters.data('category-start');

			//filter to initial category state
			filter( initialCategory );

			//bind events
			$('.filters').on( 'click', 'button', function() {
				var filterValue = $( this ).attr('data-filter');				
				filter(filterValue);
			});	 

			$('.button-group').each( function( i, buttonGroup ) {
				
				var $buttonGroup = $( buttonGroup );

				$buttonGroup.on( 'click', 'button', function() {
					
					//toggle button classes
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');

					//get the current category we're filtered to, and apply classes accordingly
					var currentCategory = $(this).data('category');
					var currentIntroduction = '.work-introduction-category-' + currentCategory;
					
					$workIntroductions.filter('.active').removeClass('active').addClass('inactive');
					$(currentIntroduction).removeClass('inactive').addClass('active');					

					//apply global classes to manage what the specifics of the category we're viewing
					if( currentCategory !== 'all' ){
						$('body').addClass('category-filtered');
					} 
					else if ( currentCategory === 'all' ){
						$('body').removeClass('category-filtered');
					}

				});
			});				


		});


	}



	//filter projects
	function filter( filterValue ){
		console.log(filterValue);

		update( filterValue );
	}


	//update the view
	function update( category ){


	}


	//bind events to the 
	function bindEvents(){

	}

	return {
		initialize: initialize
	};

};

