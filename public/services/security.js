'use strict';

angular.module('mean.keycloak').config(function($httpProvider) {

    $httpProvider.interceptors.push('errorInterceptor');

    $httpProvider.interceptors.push('spinnerInterceptor');
    $httpProvider.interceptors.push('authInterceptor');

}).factory('authInterceptor', [ '$q', 'Auth',
    function($q, Auth) {
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
    }
]).factory('errorInterceptor', ['$q', 'Auth',
    function($q, Auth) {
        return function(promise) {
            return promise.then(function(response) {
                return response;
            }, function(response) {
                if (response.status === 401) {
                    Auth.authz.logout();
                } else if (response.status === 403) {
                    alert('Forbidden');
                } else if (response.status === 404) {
                    alert('Not found');
                } else if (response.status) {
                    if (response.data && response.data.errorMessage) {
                        alert(response.data.errorMessage);
                    } else {
                        alert('An unexpected server error has occurred');
                    }
                }
                return $q.reject(response);
            });
        };
    }
]).factory('spinnerInterceptor', ['$q', 'Auth',
    function($q, $window, $rootScope, $location) {
        return function(promise) {
            return promise.then(function(response) {
                return response;
            }, function(response) {
                return $q.reject(response);
            });
        };
    }
]);