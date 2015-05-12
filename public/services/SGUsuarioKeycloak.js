'use strict';

angular.module('mean.keycloak').provider('sgKeycloak', function() {

    this.restUrl = 'http://localhost';

    this.$get = function() {
        var restUrl = this.restUrl;
        return {
            getRestUrl: function() {
                return restUrl;
            }
        }
    };

    this.setRestUrl = function(restUrl) {
        this.restUrl = restUrl;
    };
});


angular.module('mean.keycloak').factory('KeycloakRestangular', ['Restangular', 'sgKeycloak', function(Restangular, sgKeycloak) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(sgKeycloak.getRestUrl());
    });
}]);

angular.module('mean.keycloak').factory('SGUsuarioKeycloak', ['KeycloakRestangular',  function(KeycloakRestangular) {

    var url = "users";

    var modelMethos = {
        $find: function(username){
            return KeycloakRestangular.one(url, username).get();
        },
        $search: function(queryParams){
            return KeycloakRestangular.all(url).getList(queryParams);
        },
        $roleMappings : function(username){
            return KeycloakRestangular.one(url + '/' + username + '/role-mappings').get();
        },
        $realmRoles : function(username){
            return KeycloakRestangular.one(url + '/' + username + '/role-mappings/realm').get();
        }

    };

    return modelMethos;

}]);