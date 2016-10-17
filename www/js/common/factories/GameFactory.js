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
                decksArr.push(deckId)
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
            playerRef.set({
                name: playerName
            })
            return $http.post(`https://blankagainsthumanity.herokuapp.com/api/games/${gameId}/?playerId=${playerId}`)
        };

        GameFactory.getDecksByTeamId = (id) => {
            const teamId = (typeof id !== 'number') ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/decks?team=${teamId}`)
                .then(res => res.data)

        };

        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/games/${gameId}/users`);
        };

        GameFactory.getGameByGameId = (gameId, teamId) => {
            teamId = teamId || $localStorage.team.id
            const gamesRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            return gamesRef.once('value').then(snapshot => snapshot.val())
        };

        GameFactory.getGamesByTeamId = (teamId) => {
            console.log("###TEAM ID", teamId)
            teamId = teamId || $localStorage.team.id
            console.log('the team id is:', teamId)
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/games/?teamId=${teamId}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        };

        GameFactory.getGamesByUserId = () => {
            console.log('getGamesByUserId called')
            return $http.jsonp(`https://blankagainsthumanity.herokuapp.com/api/games/?userId=${$localStorage.user.id}`)
                .then(res => {
                    console.log('resolved')
                    return res.data
                })
                .catch(err => console.log(err));
        };

        GameFactory.getOpenGames = () => {
            console.log('getGamesByUserId called')
            const teamId = $localStorage.team.id;
            const userId = $localStorage.user.id;
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/games/?teamId=${teamId}&userId=${userId}&open=true`)
                .then(res => res.data)
                .catch(err => console.log(err));
        };

        return GameFactory;
    }

);

