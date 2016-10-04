'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var creds = require('../../../env/development.js')


router.get('/', function(req, res, next){
	res.json({'clientID':creds.SLACK.clientID, 'clientSecret': creds.SLACK.clientSecret})
})