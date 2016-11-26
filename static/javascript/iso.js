
"use strict";

module.exports = function( $, Isotope ) {

	var iso;
	var grid = document.querySelector('#grid');

	function setupIso() {

		$(window).on("load", function() {

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
						console.log(order);
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


			// bind filter button click
			$('.filters').on( 'click', 'button', function() {
				var filterValue = $( this ).attr('data-filter');				
				filter(filterValue);
			});	 		

			// change is-checked class on buttons
			$('.button-group').each( function( i, buttonGroup ) {
				
				var $buttonGroup = $( buttonGroup );
				var $workIntroductions = $('.work-introduction-category');

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


	//filter the projects
	function filter(filterValue){
		
		$('.featured').removeClass('featured-active');
		$('.featured').attr('data-sort', 2 );

		//isotope filtering
		iso.arrange({
			  // item element provided as argument
			  filter: function( itemElem ) {
			  	var flag = $(itemElem).hasClass(filterValue);
			  	$(itemElem).removeClass('featured-active');
			  	var $featuredItem = $('.featured-' + filterValue);
			  	$featuredItem.addClass('featured-active');
			  	$featuredItem.attr('data-sort', 1 );
			  	return flag;
			  }
			});

		//jump to the top of the page
		$('html,body').animate( { scrollTop: 0 }, 250 );

		sort();

	}

	function sort(){
		iso.updateSortData();
		iso.arrange({
			sortBy: 'featured',
			sortAscending: true
		});
	}


	return {
		filter: filter,
		setupIso: setupIso
	};
};

