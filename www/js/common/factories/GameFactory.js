angular
    .module('starter')
    .factory('GameFactory', () => {
        const GameFactory = {};

        GameFactory.addUser = () => {

        };

        GameFactory.startNewGame = () => {
            console.log('starting new game');
            return $http.post('http://localhost:1337/api/games', {
                    name: 'testgame'
                })
                .then(res => res.data);
        };

        return GameFactory;
    });