'use strict';

/* jshint -W098 */
angular.module('mean.keycloak').controller('KeycloakAccountManagementController', ['$scope', 'Auth', 'SGUsuarioKeycloak',
    function($scope, Auth, SGUsuarioKeycloak) {

        $scope.user = {
            username: Auth.authz.idTokenParsed.preferred_username,
            roles: []
        };

        $scope.loadRoles = function(){
            SGUsuarioKeycloak.$roleMappings($scope.user.username).then(function(response){
                var realmRoles = response.realmMappings;
                for(var i=0; i<realmRoles.length; i++){
                    if(realmRoles[i].name !== 'manage-account' && realmRoles[i].name !== 'view-profile'){
                        $scope.user.roles.push(realmRoles[i].name);
                    }
                }
            });
        };
        $scope.loadRoles();

    }
]);