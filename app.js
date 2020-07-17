const express = require('express');
const proxy = require('http-proxy-middleware');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
$ = require("jquery");

var api = new ParseServer({
    databaseURI: 'mongodb+srv://yagoliveira:0Qm*0!c@TiWs@cluster0.dm1lp.gcp.mongodb.net/parse_database?retryWrites=true&w=majority', // Connection string for your MongoDB database
    appId: 'testeApi',
    masterKey: 'deee2f86-ad8b-4750-b00e-142b07e0b131',
    restApiKey: 'chaveApiKey',
    clientApiKey: 'clienteApiKey',
    serverURL: 'http://localhost:3000/api' // Don't forget to change to https if needed
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:3000/api",
            "appId": "testeApi",
            "masterKey": "deee2f86-ad8b-4750-b00e-142b07e0b131",
            "appName": "Teste Parse"
        }
    ]
}, options);


const app = express();

app.use('/', express.static('public'));

app.use('/api', api);

app.use('/dashboard', dashboard);


app.listen(3000, () => {
    console.log('Proxy listening on port 3000');
});