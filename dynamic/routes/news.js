"use strict";


//var route404 = require('./404.js'); 
//var compose = require('../utilities/compose.js'); //helper to compose functions *magic
//var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response
//var checkCategorySlug = require('../utilities/check-category-slug.js')(); //check if the category is valid

module.exports = function( wp, config, globals, page ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    
    return function( req, res ) {

        var page;

        if ( req.params.page > 1 ){
            page = req.params.page;
        }else{
            page = 1;
        }

        wp.news().perPage( 12 ).page( page ).param('_embed', true).param('_paging', true).then( function( data ) {
            wp.namespace( 'acf/v2' ).options().then( function( dataOptions ) {

                res.render( 'news.html', {
                    globals: globals,
                    options: dataOptions.acf,
                    news: data.map( urlReplace ),
                    paging: data._paging,
                    page: page,
                    featured_image: function( item, size ) {
                    console.log( item._embedded['wp:featuredmedia'][0].media_details.sizes[size] );
                    if ( typeof item._embedded['wp:featuredmedia'][0] !== "undefined" && typeof item._embedded['wp:featuredmedia'][0].media_details.sizes[size] !== "undefined" ) {
                        //console.log('true');
                        return item._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;
                    }      
                    else{
                        console.log('false');
                    }
                },
                arrayOfLength: function( n ) {
                    if(typeof n === 'string') n = parseInt(n);
                    return Array.apply( Array, new Array( n )  );
                }
            });
            });
        });

    };

};
