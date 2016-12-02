"use strict";


//var route404 = require('./404.js'); 
//var compose = require('../utilities/compose.js'); //helper to compose functions *magic
//var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response
//var checkCategorySlug = require('../utilities/check-category-slug.js')(); //check if the category is valid

module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

    wp.news().perPage(12).param('_embed', true).then( function( data ) {

        //console.log(data);
        //console.log('------');

        var news = data.map( urlReplace );

        res.render( 'news.html', {
            globals: globals,
            news: news,
            featured_image: function( item, size ) {
                //console.log( item._embedded['wp:featuredmedia'][0].media_details.sizes[size] );
                if ( typeof item._embedded['wp:featuredmedia'][0] !== "undefined" && typeof item._embedded['wp:featuredmedia'][0].media_details.sizes[size] !== "undefined" ) {
                    return item._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;
                }      
            }
        });

    });

};
};
