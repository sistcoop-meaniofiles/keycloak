'use strict';

var Keycloak = require('connect-keycloak');
var express = require('express');
var session = require('express-session');
var app = express();

var memoryStore = new session.MemoryStore();

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