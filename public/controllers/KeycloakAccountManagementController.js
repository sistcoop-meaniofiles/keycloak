'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakAccountManagementController', ['$scope', 'Auth', 'SGUsuarioKeycloak', 'SGSession', 'toastr',
    function ($scope, Auth, SGUsuarioKeycloak, SGSession, toastr) {

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
            var realmRoles = Auth.authz.realmAccess.roles;
            for (var i = 0; i < realmRoles.length; i++) {
                $scope.user.roles.push(realmRoles[i]);
            }
        };
        $scope.loadRoles();

        //si se está en el master no es necesario cargar los datos
        //de trabajadores, caja, agencia, sucursal
        if (Auth.authz.realm != 'sistcoop-master') {

            //cargar sucursal
            $scope.loadSucursal = function () {
                SGSession.getSucursal().then(function (response) {
                    $scope.session.sucursal = response;
                    if (angular.isUndefined($scope.session.sucursal)) {
                        toastr.error('SUCURSAL no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                            closeButton: true,
                            timeOut: 0,
                            positionClass: 'toast-top-center'
                        });
                    }
                });
            };
            $scope.loadSucursal();

            //cargar agencia
            $scope.loadAgencia = function () {
                SGSession.getAgencia().then(function (response) {
                    $scope.session.agencia = response;
                    if (angular.isUndefined($scope.session.agencia)) {
                        toastr.error('AGENCIA no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                            closeButton: true,
                            timeOut: 0,
                            positionClass: 'toast-top-center'
                        });
                    }
                });
            };
            $scope.loadAgencia();

            //cargar trabajadorCaja
            $scope.loadTrabajadorCaja = function () {
                SGSession.getTrabajadorCaja().then(function (response) {
                    $scope.session.trabajadorCaja = response;
                    if (angular.isUndefined($scope.session.trabajadorCaja)) {
                        toastr.error('TRABAJADOR no cargado. Podria ocasionar un mal funcionamiento del sistema', '', {
                            closeButton: true,
                            timeOut: 0,
                            positionClass: 'toast-top-center'
                        });
                    }
                });
            };
            $scope.loadTrabajadorCaja();

            //Cargar caja
            $scope.loadCaja = function () {
                SGSession.getCaja().then(function (response) {
                    $scope.session.caja = response;

                    if($scope.user.roles.indexOf('CAJERO') != -1 && angular.isUndefined($scope.session.caja)) {
                        toastr.error('CAJA no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                            closeButton: true,
                            timeOut: 0,
                            positionClass: 'toast-top-center'
                        });
                    }
                });
            };
            $scope.loadCaja();

        }

    }
]);