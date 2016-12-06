"use strict";

var empty = require('../utilities/empty.js');
//var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( wp, options, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( options );

    return function( req, res, next ) {

        var postName = req.params.id;
        console.log(postName);

        wp.news().param('_embed', true).filter( 'name', postName ).then( function( data ) {

            var postId = data[0].id;
            console.log(postId);

            wp.news().perPage( 3 ).param('_embed', true).param('exclude', postId).then( function( relatedNews ) {

                if ( empty( data ) ) {
                    var err = new Error();
                    err.status = 404;
                    next( err );
                } else if ( data.length === 1 ) {
                    res.render( 'news-item.html', { 
                     globals: globals,
                     options: options,
                     item: data[0],
                     relatedNews: relatedNews.map( urlReplace ),
                     featured_image: function( item, size ) {
                        if ( typeof item._embedded['wp:featuredmedia'][0] !== "undefined" && typeof item._embedded['wp:featuredmedia'][0].media_details.sizes[size] !== "undefined" ) {
                            return item._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url;
                        }      
                    }
                } );

                } else {
                    console.error( 'CMS: returned multiple results for single slug' );
                }

            });
        });
    };

};
