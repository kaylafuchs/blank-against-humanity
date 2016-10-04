app.factory('GameFactory', ($http) => {
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

    GameFactory.getLoggedInUsersGame = () => {

    };

    GameFactory.joinGameById = (gameId) => {
        console.log('joining game')
            //var playersTeam = 
        var gameId = 8;
        var playerId = 2; //eventually make it get current 
        return $http.post(`http://localhost:1337/api/games/${gameId}?playerId=${playerId}`, {

        })
    }

    return GameFactory;
});
