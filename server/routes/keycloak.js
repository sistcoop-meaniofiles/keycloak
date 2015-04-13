'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Keycloak, app, auth, database) {

  app.get('/keycloak/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/keycloak/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/keycloak/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/keycloak/example/render', function(req, res, next) {
    Keycloak.render('index', {
      package: 'keycloak'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
