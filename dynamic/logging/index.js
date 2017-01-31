"use strict";

module.exports = function Logger( config ) {
    if (!(this instanceof Logger)) { return new Logger( config ); }
    var self = this;

    var debug = true;

    self.log = function( message ) {
        if ( debug ) {
            console.log( ['[',(new Date()).toISOString(),'] ', message ].join('') );
        }

        return self;
    };

    self.error = function( err ) {
        if ( debug && (err !== null) ) {
            console.error( ['[',(new Date()).toISOString(),'] ', err.message, '\n', err.stack, '\n'].join('') );
        }

        return self;
    };

    self.stacktrace = function( err ) {
        if ( debug ) {
            console.error( [ err.stack, '\n' ].join('') );
        }

        return self;
    };
};
