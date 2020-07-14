const express = require('express');
const proxy = require('http-proxy-middleware');
var ParseServer = require('parse-server').ParseServer;
$ = require("jquery");

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    appId: 'testeApi',
    masterKey: 'deee2f86-ad8b-4750-b00e-142b07e0b131', // Keep this key secret!
    serverURL: 'http://localhost:3000/parse' // Don't forget to change to https if needed
});


const app = express();

app.use('/', express.static('public'));

app.use('/parse', api);

app.get('/api/', function (req, res) {
    res.send('Parse');
});


app.listen(3000, () => {
    console.log('Proxy listening on port 80');
});