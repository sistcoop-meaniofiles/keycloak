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
            SGUsuarioKeycloak.$realmRoles($scope.user.username).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.user.roles.push(response[i].name);
                }

                //verificar si el rol CAJERO tiene una caja asignada
                if($scope.user.roles.indexOf('CAJERO') != -1) {
                    var listener = $scope.$watch('session.caja', function(newValue) {
                        if(angular.isUndefined(newValue)){
                            toastr.error('CAJA no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                                closeButton: true,
                                timeOut: 0,
                                positionClass: 'toast-top-center'
                            });
                        }
                    }, true);
                }

            });
        };
        $scope.loadRoles();



        $scope.loadSucursal = function () {
            SGSession.getSucursal().then(function (response) {
                $scope.session.sucursal = response;
                if(angular.isUndefined($scope.session.sucursal)){
                    toastr.error('SUCURSAL no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                        closeButton: true,
                        timeOut: 0,
                        positionClass: 'toast-top-center'
                    });
                }
            });
        };
        $scope.loadSucursal();

        $scope.loadAgencia = function () {
            SGSession.getAgencia().then(function (response) {
                $scope.session.agencia = response;
                if(angular.isUndefined($scope.session.agencia)){
                    toastr.error('AGENCIA no cargada. Podria ocasionar un mal funcionamiento del sistema', '', {
                        closeButton: true,
                        timeOut: 0,
                        positionClass: 'toast-top-center'
                    });
                }
            });
        };
        $scope.loadAgencia();

        $scope.loadTrabajadorCaja = function () {
            SGSession.getTrabajadorCaja().then(function (response) {
                $scope.session.trabajadorCaja = response;
                if(angular.isUndefined($scope.session.trabajadorCaja)){
                    toastr.error('TRABAJADOR no cargado. Podria ocasionar un mal funcionamiento del sistema', '', {
                        closeButton: true,
                        timeOut: 0,
                        positionClass: 'toast-top-center'
                    });
                }
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