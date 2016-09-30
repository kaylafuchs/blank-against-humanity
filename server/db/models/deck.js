'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('black_card', {
    name: {
        type: Sequelize.STRING
    },
}, {
   
});
