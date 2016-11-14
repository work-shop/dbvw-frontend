"use strict";

var WP = require('wpapi'); //a module to support wordpress API

module.exports = function( schema, options ) {

	//returning an instance of the API, including the schema or information architecture
	return new WP({
        endpoint: options.remote_api, 
        routes: schema.routes
    });

};
