'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakAccountManagementController', ['$scope', 'Auth', 'SGUsuarioKeycloak', 'SGSession',
    function ($scope, Auth, SGUsuarioKeycloak, SGSession) {

        $scope.user = {
            username: Auth.authz.idTokenParsed.preferred_username,
            roles: []
        };

        $scope.session = {
            sucursal: undefined,
            agencia: undefined,
            trabajadorCaja: undefined,
            caja: undefined
        };

        $scope.loadRoles = function () {
            SGUsuarioKeycloak.$realmRoles($scope.user.username).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.user.roles.push(response[i].name);
                }
            });
        };
        $scope.loadRoles();



        $scope.loadSucursal = function () {
            SGSession.getSucursal().then(function (response) {
                $scope.session.sucursal = response;
            });
        };
        $scope.loadSucursal();

        $scope.loadAgencia = function () {
            SGSession.getAgencia().then(function (response) {
                $scope.session.agencia = response;
            });
        };
        $scope.loadAgencia();

        $scope.loadTrabajadorCaja = function () {
            SGSession.getTrabajadorCaja().then(function (response) {
                $scope.session.trabajadorCaja = response;
            });
        };
        $scope.loadTrabajadorCaja();

        $scope.loadCaja = function () {
            SGSession.getCaja().then(function (response) {
                $scope.session.caja = response;
            });
        };
        $scope.loadCaja();

    }
]);