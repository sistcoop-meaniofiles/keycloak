'use strict';

/* jshint -W098 */

angular.module('mean.keycloak').config(function($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
});

angular.module('mean.keycloak').factory('authInterceptor', function($q, Auth) {
    return {
        request: function (config) {
            if (!config.url.match(/.html$/)) {
                var deferred = $q.defer();
                if (Auth.authz.token) {
                    Auth.authz.updateToken(5).success(function () {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                        deferred.resolve(config);
                    }).error(function () {
                        location.reload();
                    });
                }
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
