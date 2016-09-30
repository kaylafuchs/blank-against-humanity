'use strict';
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('round', {
    name: {
        type: Sequelize.STRING,
    },

});