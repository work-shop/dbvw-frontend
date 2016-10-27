"use strict";

var maybeRendered = require('../utilities/maybe-with-default.js')( { rendered: undefined } );
var maybeSourceUrl = require('../utilities/maybe-with-default.js')( { 'wp:featuredmedia': [ {source_url: undefined }]} );

module.exports = function ( r ) {

    try {

        var x = {
            title: maybeRendered( r.title ).rendered,
            slug: r.slug,
            type: r.type,
            modified: r.modified,
            id: r.id,
            link: r.link,
            featured_media: maybeSourceUrl( r._embedded )['wp:featuredmedia'][0].source_url,
            content: maybeRendered( r.content ).rendered
        };

        return x;

    } catch ( e ) {

        console.error( e.message );
        return {};

    }

};
