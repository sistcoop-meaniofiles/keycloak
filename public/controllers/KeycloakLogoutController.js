'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakLogoutController', ['$scope', 'Auth',
    function($scope, Auth) {
        Auth.authz.logout();
    }
]);