'use strict';

/* global jQuery:true */
/*
window.auth = {};

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    angular.element(document).ready(function ($http) {
        var keycloakAuth = new Keycloak('/keycloak/assets/keycloak/keycloak.json');
        keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
            window.auth.authz = keycloakAuth;
            angular.module('mean.keycloak').factory('Auth', function() {
                return auth;
            });
            angular.bootstrap(document, ['mean']);
        }).error(function () {
            window.location.reload();
        });
    });

});

function processModules(modules) {
    var packageModules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router'],m,mn;
    for (var index in modules) {
        m = modules[index];
        mn = 'mean.'+m.name;
        angular.module(mn, m.angularDependencies || []);
        packageModules.push(mn);
    }

    angular.module('mean', packageModules);
}

jQuery.ajax('/_getModules', {
    dataType: 'json',
    async:false,
    success: processModules
});*/