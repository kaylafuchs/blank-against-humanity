'use strict';
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('team', {
    name: {
        type: Sequelize.STRING,
    }
});