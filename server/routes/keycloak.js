'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Keycloak, app, auth, database) {

    app.get('/', auth.requiresLogin, function(req, res, next) {
        next();
    });

    app.get('/keycloak/loggedin', auth.requiresLogin, function(req, res, next) {
        res.json({username: 'keycloak'});
    });

    app.get('/keycloak/token', auth.requiresLogin, function(req, res, next) {
        var token = req.auth.grant.access_token.token;
        res.json(token);
    });

};
