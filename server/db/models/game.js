'use strict';
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('game', {
    name: {
        type: Sequelize.STRING,
        
    },
    // rules: {
    //     type: Sequelize.STRING
    // }


});