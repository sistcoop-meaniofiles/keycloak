'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Keycloak = new Module('keycloak');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Keycloak.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Keycloak.routes(app, auth, database);

    //add libraries
    Keycloak.aggregateAsset('js', '../lib/keycloak/dist/keycloak.js', {global:true,  weight: -4, group: 'header'});
    Keycloak.aggregateAsset('js', '../js/keycloak.js', {global:true,  weight: -3, group: 'footer'});

    return Keycloak;
});
