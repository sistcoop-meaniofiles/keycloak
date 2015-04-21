'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakController', ['$scope', 'Global', 'Keycloak',
  function($scope, Global, Keycloak) {
    $scope.global = Global;
    $scope.package = {
      name: 'keycloak'
    };
  }
]);
