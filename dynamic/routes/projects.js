"use strict";


var compose = require('../utilities/compose.js'); //helper to compose functions *magic
var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( cms, config, globals ) {

    //
    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        cms.projects() //get all the projects custom post type
            .param('_embed', true) //embed all the of embedded data that would otherwise be a URI
            .then( function( data ) {

                res.render( 'projects.html', {
                    globals: globals,
                    projects: data.map( compose( destructure, urlReplace ) ) //map across an array of wordpress projects 
                });

            });

    };
};
