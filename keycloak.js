'use strict';

var Keycloak = require('connect-keycloak');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

//app
var app = express();

//store
var connection = mongoose.createConnection();
var memoryStore = new MongoStore({ mongooseConnection: connection });

app.use( session({
    secret: '2fafb62e-3437-4bc3-b1cb-42f591d85c8f',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
} ));

var keycloak = new Keycloak({
    store: memoryStore
});

module.exports = keycloak;