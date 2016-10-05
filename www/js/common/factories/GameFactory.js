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

    // GameFactory.getLoggedInUsersGame = () => {

    // };

    GameFactory.joinGameById = (gameId) => {
        console.log('joining game')
            //var playersTeam = 
        var gameId = 8;
        var playerId = 2; //eventually make it get current 
        return $http.post(`http://localhost:1337/api/games/${gameId}?playerId=${playerId}`, {

        })
    }

    //
    GameFactory.createGameByIdFireBase = (firebasegameId) => {
        //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //needs to be .thenable
        const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
        newRef.set({
            playerId: req.query.playerId
        });

    }


    //vs getCardsByTeamId
    GameFactory.getDecksByTeamId = (teamId) => {

    };

    GameFactory.getCardsByCreator = (userId) => {

    }

    GameFactory.getUsersByGameId = (gameId) => {
        return $http.get(`http://localhost:1337/api/games/${gameId}/users`);
    };


    GameFactory.getGamesByUserId = (userId) => {
            return $http.get(`http://localhost:1337/api/games/?userId=${userId}`)
        }
        // .then(createdGame =>
        //     //addwatcher to game id in firebase)
        //     return createdGame
        // };



    GameFactory.getGamesByTeamId = (teamId) => {
        return $http.get(`http://localhost:1337/api/games/?teamId=${teamId}`);
    };

    GameFactory.getCardsByDeckId = (deckId) => {
        return $http.get(`http://localhost:1337/api/cards/${deckId}`);
    }



    //get all games by team route

    return GameFactory;
});



// implement joining a game using / session $http request in an angular factory called GameFactory that hits the route / api / games / …..function joinGameById(gameId) {
//     const user = getLoggedInUser() //assumes, could later be optional in admin panel
//     getLOggedInUSer().then(loggedUSer => {
//         don’ t need game.findby id, can just do fb part of gamers independently //Game.findById(gameId ).then(foundGame => let gameRef = fb.db.ref(‘/         games’+foundGame.id))
//     })
// }
// sign in button
