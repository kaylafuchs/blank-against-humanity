app.factory('GameFactory', ($http, $rootScope, $localStorage) => {
    const ourIps = {
        nikita: "192.168.4.213",
        kayla: "192.168.4.225",
        nithya: "192.168.1.48",
        dan: "192.168.4.236"
    }
    const currentIp = ourIps.nikita

        // start a new game derp
        const GameFactory = {};
        GameFactory.startNewGame = (gameConfig) => {
            //can also get all the decks by team here to prepare
            const teamId = $localStorage.team.id || 2;
            const creatorId = $localStorage.user.id || 3;
            return $http.post(`http://${currentIp}:1337/api/games`, {
                    name: gameConfig.name || 'AWESOME Name',
                    teamId: teamId,
                    creatorId: creatorId,
                    creatorName: $localStorage.user.name || 'dan', //might be unnecessary if we have the user id
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
            return $http.get(`http://${currentIp}:1337/api/decks/${id}/cards`)
                .then(res => res.data);
        };

        // TODO: combine this into the above startNewGame func
        // take all of the selected decks' cards and put them in the firebase game object pile (through route)
        GameFactory.addPileToGame = (gameId, decks) => {
            const decksArr = [];
            for (var deckId in decks) {
                decksArr.push(deckId)
            }
            return $http.post(`http://${currentIp}:1337/api/games/${gameId}/decks`, {
                'decks': decksArr
            })
        }

        GameFactory.joinGameById = (gameId) => {
            const teamId = $localStorage.team.id;
            const playerId = $localStorage.user.id;
            const playerName = $localStorage.user.name;
            const playerRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/players/${playerId}`)
            playerRef.set({
                name: playerName
            })
            const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            gameRef.on('value', snapshot => {
                $rootScope.$broadcast('changedGame', snapshot.val());
            })
            $http.post(`http://${currentIp}:1337/api/games/${gameId}?playerId=${playerId}`)
        }

        GameFactory.getDecksByTeamId = (id) => {
            const teamId = (typeof id !== 'number') ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
            return $http.get(`http://${currentIp}:1337/api/decks?team=${teamId}`)
                .then(res => res.data)

        };


        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`http://${currentIp}:1337/api/games/${gameId}/users`);
        };



        GameFactory.getGameByGameId = (gameId, teamId) => {
            teamId = teamId || $localStorage.team.id
            const gamesRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            return gamesRef.once('value').then(snapshot => {
                return snapshot.val();
            })
        };

        GameFactory.getGamesByTeamId = (teamId) => {
            teamId = teamId || $localStorage.team.id
            return $http.get(`http://${currentIp}:1337/api/games/?teamId=${teamId}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        };

        GameFactory.getGamesByUser = (userId) => {
            return $http.get(`http://${currentIp}:1337/api/games/?userId=${userId}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        }
        return GameFactory;
    }

);
