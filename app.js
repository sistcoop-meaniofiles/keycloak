'use strict';

/*
 * Defining the Package
 */
var mean = require('meanio');

var Module = require('meanio').Module;

var Keycloak = new Module('keycloak');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Keycloak.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Keycloak.routes(app, auth, database);

    Keycloak.aggregateAsset('css', 'keycloak.css');
    Keycloak.aggregateAsset('js', '../lib/keycloak/dist/keycloak.js');

    mean.register('auth', MeanUser.auth);

    var auth = {};
    var keycloakAuth = new Keycloak();
    keycloakAuth.onAuthLogout = function() {
        location.reload();
    };
    keycloakAuth.init({ onLoad: "login-required" }).success(function () {
        auth.authz = keycloakAuth;
        var app = angular.module("mean");
        app.factory('Auth', function() {
            return auth;
        });
        angular.bootstrap(document, ["mean"]);
    }).error(function () {
        window.location.reload();
    });

    return Keycloak;
});
