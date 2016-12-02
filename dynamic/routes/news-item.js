"use strict";

var empty = require('../utilities/empty.js');
//var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( cms, options, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( options );

    return function( req, res, next ) {

        var postName = req.params.id;

        cms.news()
        .param('_embed', true)
        .filter( 'name', postName )
        .then( function( data ) {

            if ( empty( data ) ) {

                var err = new Error();
                err.status = 404;
                next( err );

            } else if ( data.length === 1 ) {

                res.render( 'project.html', { 
                   globals: globals,
                   item: destructure( urlReplace( data[0] ) ) 
               } );

            } else {

                console.error( 'CMS: returned multiple results for single slug' );

            }

        });

    };
};
