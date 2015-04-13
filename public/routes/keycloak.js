'use strict';

angular.module('mean.keycloak').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('keycloak example page', {
      url: '/keycloak/example',
      templateUrl: 'keycloak/views/index.html'
    });
  }
]);
