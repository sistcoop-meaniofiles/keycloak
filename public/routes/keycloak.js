'use strict';

angular.module('mean.keycloak').config(['$stateProvider',
    function($stateProvider) {

        var checkLoggedOut = function($q, $timeout, $http, $location) {
            var deferred = $q.defer();
            $http.get('/keycloak/loggedin').success(function(user) {
                $timeout(deferred.reject);
                $location.url('/login');
            }).error(function(data, status, headers, config) {
                $timeout(deferred.resolve);
            });
            return deferred.promise;
        };

        $stateProvider
            .state('keycloak', {
                url: '/keycloak',
                templateUrl: 'keycloak/views/index.html',
                abstract: true
            }).state('keycloak.auth', {
                url: '/auth',
                templateUrl: 'keycloak/views/index.html'
            }).state('keycloak.auth.login', {
                url: '/login',
                templateUrl: 'keycloak/views/index.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            }).state('keycloak.auth.logout', {
                url: '/logout',
                template: '<div>logout</div>',
                controller: 'KeycloakLogoutController'
            }).state('keycloak.auth.accountManagement', {
                url: '/accountManagement',
                template: '<div>account management</div>',
                controller: 'KeycloakAccountManagementController'
            });
    }
]);