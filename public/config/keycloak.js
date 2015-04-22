'use strict';

/* jshint -W098 */

angular.module('mean.keycloak').config(function($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('keycloakAuthInterceptor');
});

angular.module('mean.keycloak').run(function($http, KeycloakAuth) {
    $http.get('/keycloak/token').success(function(data) {
        KeycloakAuth.authz.token = data;
    });
});

angular.module('mean.keycloak').factory('KeycloakAuth', function() {

    var Auth = {
        authz: {
            token: undefined,
            updateToken: function(minValidity){
            }
        }
    };

    return Auth;
});

angular.module('mean.keycloak').factory('keycloakAuthInterceptor', function($q, KeycloakAuth) {
    return {
        request: function (config) {
            if (!config.url.match(/.html$/)) {
                var deferred = $q.defer();
                //if (KeycloakAuth.authz.token) {
                 //   KeycloakAuth.authz.updateToken(5).success(function () {
                      //  config.headers = config.headers || {};
                       // config.headers.Authorization = 'Bearer ' + KeycloakAuth.authz.token;

                        deferred.resolve(config);
                 //   }).error(function () {
                 //       location.reload();
                 //   });
                //}
                if (KeycloakAuth.authz.token){
                    alert(JSON.stringify(KeycloakAuth));
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + KeycloakAuth.authz.token;
                }
                deferred.resolve(config);
                return deferred.promise;
            } else {
                return config;
            }
        }
    };
});

angular.module('mean.keycloak').factory('errorInterceptor', function($q) {
    return function(promise) {
        return promise.then(function(response) {
            return response;
        }, function(response) {
            if (response.status == 401) {
                alert('you must logout, error 401');
            } else if (response.status == 403) {
                alert('forbiden, error 401');
            } else if (response.status == 404) {
                alert('not found, error 404');
            } else if (response.status) {
                alert('An unexpected server error has occurred');
            }
            return $q.reject(response);
        });
    };
});
