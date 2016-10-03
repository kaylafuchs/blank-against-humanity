'use strict';
const db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-consts
const Card = require('./models/card')
const Game = require('./models/game');
const Round = require('./models/round');
const Team = require('./models/team');
const User = require('./models/user');


User.belongsToMany(Game, {through: 'player_games'}); 
 
User.belongsTo(Team, {as: 'userTeam'}); //User.belongsTo(Team)
User.hasMany(Card, {as: 'created_cards'});
User.belongsToMany(Card, {through: 'tagged_cards'}); //can tag many people in a card

//Channel.belongsTo(team)

Team.hasMany(User); 
Team.hasMany(Game);
Team.hasMany(Card);

Card.belongsTo(Team); //change to channel
Card.belongsToMany(Game, {through: 'game_cards'});
Card.belongsTo(User, {as: 'author'})
Card.belongsTo(User, {as: 'taggedUser'})


Round.hasOne(Card, {as: 'blackCard'}); 
Round.hasMany(Card, {as: 'cardsPlayed'});

Round.belongsTo(Game); 
Round.belongsToMany(User, {through: 'player'});
Round.belongsToMany(User, {through: 'judge'}); //model was_judge?

Game.hasMany(Round);
Game.belongsToMany(User, {through: 'player'});
Game.belongsTo(Team);
Game.hasMany(Round);

