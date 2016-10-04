'use strict';
const db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-consts
const Card = require('./models/card')
const Game = require('./models/game');
const Round = require('./models/round');
const Team = require('./models/team');
const User = require('./models/user');
const Deck = require('./models/deck')


User.belongsToMany(Game, {through: 'player_games'});

User.belongsTo(Team); //User.belongsTo(Team)
User.hasMany(Card, {as: 'created_cards'});
User.belongsToMany(Card, {through: 'tagged_cards'}); //can tag many people in a card
Card.belongsTo(Deck)
Deck.hasMany(Card)
Deck.belongsTo(Team)
//Channel.belongsTo(team)

Team.hasMany(User);
Team.hasMany(Game);
Team.hasMany(Deck);


Card.belongsTo(User, {as: 'author'})
Card.belongsToMany(User, {through: 'tagged_cards'})


Round.hasOne(Card, {as: 'blackCard'});
Round.hasMany(Card, {as: 'cardsPlayed'});

Round.belongsTo(Game);
Round.belongsToMany(User, {through: 'player'});
Round.belongsToMany(User, {through: 'judge'}); //model was_judge?

Game.hasMany(Round);
Game.belongsToMany(User, {through: 'player'});
Game.belongsTo(Team);
Game.hasMany(Round);

