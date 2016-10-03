'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('card', {
    text: {
        type: Sequelize.STRING
    },
    pick: {
        type: Sequelize.INTEGER
    },
    nsfw: {
        type: Sequelize.BOOLEAN
    },
    image_url: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('white', 'black')
    }
}, {

});
