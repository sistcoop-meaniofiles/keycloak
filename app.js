'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Keycloak = new Module('keycloak');

//keycloak module
var connectKeycloak = require('./keycloak');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Keycloak.register(function(app, auth, database) {

    //set keycloak as middleware
    app.use(connectKeycloak.middleware( {
        logout: '/logout',
        admin: '/'
    } ));

    //set auth middleware
    auth.keycloak = connectKeycloak;
    auth.requiresLogin = connectKeycloak.protect();
    auth.requiresAdmin = connectKeycloak.protect('admin');

    //We enable routing. By default the Package Object is passed to the routes
    Keycloak.routes(app, auth, database);

    return Keycloak;
});
