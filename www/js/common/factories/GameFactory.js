app.factory('GameFactory', ($http, $rootScope, $localStorage) => {

        const ourIps = {
            nikita: "192.168.4.213",
            kayla: "192.168.4.225",
            nithya: "192.168.1.48",
        }

        // start a new game derp
        const GameFactory = {};

        GameFactory.startNewGame = (gameConfig) => {
            //can also get all the decks by team here to prepare
            const teamId = $localStorage.team.id || 2;
            const creatorId = $localStorage.user.id || 3;
            const userName = $localStorage.user.name;
            return $http.post(`https://blankagainsthumanity.herokuapp.com/api/games`, {
                    name: gameConfig.name,
                    teamId: teamId,
                    creatorId: creatorId,
                    creatorName: userName,
                    settings: gameConfig
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    const gameId = res.data
                    const gameRef = firebase.database().ref(`/teams/${teamId}/games/${gameId}`)
                    gameRef.on('value', snapshot => {
                        $rootScope.$broadcast('changedGame', snapshot.val())
                    });
                    return gameId;
                })
        };
        // get all of a decks cards to display when looking at decks
        GameFactory.getCardsByDeckId = (id) => {
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/decks/${id}/cards`)
                .then(res => res.data);
        };

        // TODO: combine this into the above startNewGame func
        // take all of the selected decks' cards and put them in the firebase game object pile (through route)
        GameFactory.addPileToGame = (gameId, decks) => {
            console.log("adding pile to game")
            const decksArr = [];
            for (var deckId in decks) {
                if (decks[deckId]) decksArr.push(deckId)
            }
            return $http.post(`https://blankagainsthumanity.herokuapp.com/api/games/${gameId}/decks`, {
                    'decks': decksArr
                })
                .then(() => gameId)
        };

        GameFactory.joinGameById = (gameId) => {
            const teamId = $localStorage.team.id;
            const playerId = $localStorage.user.id;
            const playerName = $localStorage.user.name;
            const playerRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/players/${playerId}`)
            return playerRef.set({
                name: playerName
            }).then(() => $http.post(`https://blankagainsthumanity.herokuapp.com/api/games/${gameId}/?playerId=${playerId}`))
            .catch(err => console.log(err))
        };
        GameFactory.getDecksByTeamId = (id) => {
            const teamId = (typeof id !== 'number') ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/decks?team=${teamId}`)
                .then(res => res.data)

        };
        GameFactory.getGamesByTeamId = () => {
            const teamId = $localStorage.team.id
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/games/?teamId=${teamId}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        };
        return GameFactory;
    }

);

