"use strict";

module.exports = function($){

	var initialSet,currentElement,offsetDistance, menuLinks, targets, spyData;

	//initial target element, all target elements, offset distance
	function spyInitialize(_currentElement,_targets,_menuLinks,_offsetDistance){

		initialSet = false;

		currentElement = $(_currentElement);

		//get all of the targets
		targets = $(_targets);

		//get all of the links in the menu
		menuLinks = $(_menuLinks);

	    //how close to the top of the window the section is when it becomes active
	    offsetDistance = _offsetDistance;

		//create a new array 
		spyData = new Array();

		spyUpdate();

	}

	function spyUpdate(){

		/*
		* iterate through each menu link
		* build an array with [i][0] = menu link element
		* and [i][1] = spied item's position
		* the each function loops through each item in an array
		* i represents a climbing integer
		*/ 
		menuLinks.each(function(i){

			//create an object to hold each pair of link and target
			spyData[i] = {};

			/*
			* get the ID of the target element that corresponds to the menu link
			* store the ID as a string
			*/
			var targetId = $(this).attr('href');

			//use the offset method of the target to get the position of the top of the element in the window
			var targetOffset = $(targetId).offset();
			targetOffset = targetOffset.top;

			//store the information we care about	
			spyData[i].link = $(this);		
			spyData[i].targetOffset = targetOffset;
			spyData[i].target = $(targetId);
		});

		// /*
		// * iterate through each target
		// * build an object with [i].target = target element
		// * and [i].targetOffset = spied item's offset position on the page
		// * the each function loops through each item in an array
		// * i represents a climbing integer
		// */ 
		// targets.each(function(i){

		// 	//create an object to hold each pair of link and target
		// 	spyData[i] = {};

		// 	//store the information we care about	
		// 	spyData[i].target = $(this);

		// 	spyData[i].targetOffset = Math.round(spyData[i].target[0].offsetTop);

		// });

		spyRun();
	}

	function spyRun(){

		for(var j = 0; j < spyData.length; j++){

			var userLocation,targetPosition,nextTargetPosition;

			userLocation = $(window).scrollTop() + offsetDistance;
			targetPosition = spyData[j].targetOffset;

			if( j < (spyData.length - 1) ){
				nextTargetPosition = spyData[j+1].targetOffset;
			}

			//if the user's window.scrollTop is greater than or equal to the offsetTop of the element we're currently checking
			//AND
			//it's not the last targetable element OR the user's window.scrollTop is less than the next element
			//then we think this element should be active
			if( userLocation >= targetPosition && ( ( j === spyData.length - 1 ) || (userLocation < nextTargetPosition) ) ) {

				//if the element we think should be active is not the current element
				//OR
				//we haven't initialized the first element
				if(!currentElement === (spyData[j].target) || !initialSet ){

					menuLinks.filter('.active').removeClass('active');

					spyData[j].link.addClass('active');
					spyData[j].link.parent().addClass('active');

					currentElement.removeClass('active');
					spyData[j].target.addClass('active');
					spyData[j].target.addClass('activated');

					currentElement = spyData[j].target;
					initialSet = true;

				}

			}

		}

	}

	//return an object with three methods to initialize, update, and run the spy function
	return{
		initialize : spyInitialize,
		update : spyUpdate,
		run : spyRun
	};

};