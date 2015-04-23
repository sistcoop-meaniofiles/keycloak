'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakLogoutController', ['$scope', 'Auth',
    function($scope, Auth) {
        alert('entro');
        Auth.authz.logout();
    }
]);