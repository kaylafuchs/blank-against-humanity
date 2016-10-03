angular
    .module('starter')
    .factory('GameFactory', () => {
        const GameFactory = {};
        GameFactory.test = () => {
            console.log('it worked')
        }

        return GameFactory;
    });