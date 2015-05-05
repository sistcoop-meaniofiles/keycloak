'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakAccountController', ['$scope', 'Auth',
    function($scope, Auth) {
        Auth.authz.accountManagement();
    }
]);