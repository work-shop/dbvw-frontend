"use strict";


//var route404 = require('./404.js');
//var compose = require('../utilities/compose.js'); //helper to compose functions *magic
//var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response
//var checkCategorySlug = require('../utilities/check-category-slug.js')(); //check if the category is valid

module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        var page;

        if ( req.params.id > 1 ){
            page = req.params.id;
        }else{
            page = 1;
        }

        wp.news().perPage( 12 ).page( page ).param('_embed', true).param('_paging', true).then( function( data ) {
            wp.namespace( 'acf/v2' ).options().then( function( dataOptions ) {

                res.render( 'news.html', {
                    pageType: 'archive', 
                    pageTitle: 'News',                   
                    globals: globals,
                    options: dataOptions.acf,
                    news: data.map( urlReplace ),
                    paging: data._paging,
                    page: page,
                    featured_image: function( item, size ) {

                        try {
                            if ( typeof item._embedded['wp:featuredmedia'][0] !== "undefined" && typeof item._embedded['wp:featuredmedia'][0].media_details.sizes[size] !== "undefined" ) {
                                console.log('featured image = true');
                                return item._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;
                            } else {
                                console.log('featured image = false');
                                return undefined; //i added this, not sure its right/necessary
                            }
                        } catch( err ) {
                            globals.log.error( err, 'news.html' );
                        }

                        //this if statement is causing the problem
                        //"Cannot read property 'wp:featuredmedia' of undefined"
                        //We saw this before - trying to access an undefined property of an object is resulting in a crash
                        // if ( typeof item._embedded['wp:featuredmedia'][0] !== "undefined" && typeof item._embedded['wp:featuredmedia'][0].media_details.sizes[size] !== "undefined" ) {
                        //     console.log('featured image = true');
                        //     return item._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;
                        // } else {
                        //     console.log('featured image = false');
                        //     return undefined; //i added this, not sure its right/necessary
                        // }

                    },
                    arrayOfLength: function( n ) {
                        try {
                            if(typeof n === 'string') n = parseInt(n);
                            return Array.apply( Array, new Array( n )  );
                        } catch( err ) {
                            globals.log.error( err, 'news.html' );
                        }
                    }
                });
            }).catch( function( err ) {

                globals.log.error( err, 'news' );
                res.render( '404.html', { error_code: 500, message: "Backend server returned an error response in options(): " + err.message });

            });
        }).catch( function( err ) {

            globals.log.error( err, 'news' );
            res.render( '404.html', { error_code: 500, message: "Backend server returned an error response in news(): " + err.message });

        });

    };

};
