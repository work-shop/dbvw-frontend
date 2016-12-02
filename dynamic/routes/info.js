"use strict";

var http = require('http');
// var async = require('async');
//var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( wp, config, globals, pageName ) {

    var urlReplace = require('../utilities/resource-map.js')( config );
    var template = pageName + '.html';


    return function( req, res ) {

        wp.namespace( 'acf/v2' ).options().then( function( options ) {

            //The url we want is: 'cms.dbvw.workshopdesignstudio.org/wp-json/wp/v2/about?filter[name]={{pageName}}'
            var infoOptions = {
                host: config.api_host,
                path: '/wp-json/wp/v2/about?filter[name]=' + pageName
            };

            var callback = function(response) {
                var info = '';
                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    info += chunk;
                });
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    console.log(info[0]);
                    serveInfo(info, options);
                });
            };

            http.request('http://cms.dbvw.workshopdesignstudio.org/wp-json/wp/v2/about?filter[name]=contact', callback).end();


            //wp.namespace( 'wp/v2/about?filter[name]=contact' ).then( function( info ) {

            // wp.about().id( pageName ).then( function( info ) {

               // console.log('-----------');

                // console.log(info);

                // res.render( 'contact.html', {
                //     globals: globals,   
                //     options: options.acf,
                //     item: info
                // });

            //});//2nd request

        });//1st request


        function serveInfo( info, options ){
            //console.log(info[0].id);
            res.render( template, {
                globals: globals,   
                options: options.acf,
                item: info
            });
        }

    };//return function

};


