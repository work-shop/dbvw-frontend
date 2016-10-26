"use strict";

module.exports = function( cms, options ) {

    var urlReplace = require('../utilities/resource-map.js')( options );

    return function( req, res ) {

        cms.projects().then( function( data ) {

            console.log( data );

            res.render( 'projects.html', {
                projects: urlReplace( data )
            });

        });

    };
};
