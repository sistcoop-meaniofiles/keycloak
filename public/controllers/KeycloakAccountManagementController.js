'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakAccountManagementController', ['$scope', 'Auth', 'SGUsuarioKeycloak', 'SGSession',
    function($scope, Auth, SGUsuarioKeycloak, SGSession) {

        $scope.user = {
            username: Auth.authz.idTokenParsed.preferred_username,
            roles: []
        };

        $scope.session = {
            sucursal: SGSession.sucursal,
            agencia: SGSession.agencia
        };

        $scope.loadRoles = function(){
            SGUsuarioKeycloak.$realmRoles($scope.user.username).then(function(response){
                for(var i=0; i<response.length; i++){
                    $scope.user.roles.push(response[i].name);
                }
            });
        };
        $scope.loadRoles();

    }
]);