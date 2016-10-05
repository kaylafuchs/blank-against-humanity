'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('user', {
    slack_id: {
        type: Sequelize.STRING
    },
    avatar: {
    	type: Sequelize.STRING
    },
    name: {
    	type: Sequelize.STRING
    }
});
