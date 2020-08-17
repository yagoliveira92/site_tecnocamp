const express = require('express');
const proxy = require('http-proxy-middleware');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
$ = require("jquery");
const fs = require('fs');

let rawdata = fs.readFileSync('settings/settings.json');
let dashRawdata = fs.readFileSync('settings/dashboard.json');
let dashUserRawdata = fs.readFileSync('settings/parse-dashboard-config.json');
let settings = JSON.parse(rawdata);
let dashboardSettings = JSON.parse(dashRawdata);
let dashboardUser = JSON.parse(dashUserRawdata);

var api = new ParseServer({
    databaseURI: settings.databaseURI,
    appId: settings.appId,
    masterKey: settings.masterKey,
    restApiKey: settings.restApiKey,
    clientApiKey: settings.clientApiKey,
    serverURL: settings.serverURL,
    liveQuery: {
        classNames: ['Usuarios', 'Enderecos']
    }
});

var options = { allowInsecureHTTP: true };

var dashboard = new ParseDashboard({
    "apps": [
        dashboardSettings
    ],
    "users": dashboardUser,
    "useEncryptedPasswords": false,
}, options);


const app = express();

app.use('/', express.static('public'));

app.use('/api', api);

app.use('/dashboard', dashboard);

let httpServer = require('http').createServer(app);
httpServer.listen(3000);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer)