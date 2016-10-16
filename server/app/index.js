'use strict';
var path = require('path');
var express = require('express');
var app = express();
const ourIps = {
    nikita: "192.168.4.213",
    kayla: "192.168.4.225",
    nithya: "192.168.1.48",
    dan: "192.168.4.236"
}


const currentIp = ourIps.nikita
module.exports = function(db) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', `http://${currentIp}:8100`);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })

    require('./configure')(app, db);


    // Routes that will be accessed via AJAX should be prepended with
    // /api so they are isolated from our GET /* wildcard.
    app.use('/api', require('./routes'));



    /*
     This middleware will catch any URLs resembling a file extension
     for example: .js, .html, .css
     This allows for proper 404s instead of the wildcard '/*' catching
     URLs that bypass express.static because the given file does not exist.
     */
    app.use(function(req, res, next) {

        if (path.extname(req.path).length > 0) {
            res.status(404).end();
        } else {
            next(null);
        }

    });

    app.get('/*', function(req, res) {
        res.sendFile(app.get('indexHTMLPath'));
    });

    // Error catching endware.
    app.use(function(err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;

};

