"use strict";

var empty = require('../utilities/empty.js');
var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( wp, options, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( options );

    return function( req, res, next ) {

        var postName = req.params.id;

        wp.about().param('_embed', true).filter( 'name', 'careers' ).then( function( careers ) {
            wp.jobs().param('_embed', true).filter( 'name', postName ).then( function( data ) {

                if ( empty( data ) ) {
                    var err = new Error();
                    err.status = 404;
                    next( err );
                } else if ( data.length === 1 ) {
                    res.render( 'job.html', { 
                        globals: globals,
                        careers: careers[0],
                        item: data[0]
                    } );
                } else {
                    console.error( 'CMS: returned multiple results for single slug' );
                }

            });//2nd request
        });//1st request
    };
};
