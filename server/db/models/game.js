'use strict';
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('game', {
    name: {
        type: Sequelize.STRING
    },
    maxPlayers: {
        type: Sequelize.INTEGER
    },
    minPlayers: {
        type: Sequelize.INTEGER
    },
    maxTurnTime: {
        type: Sequelize.INTEGER
    }
});
