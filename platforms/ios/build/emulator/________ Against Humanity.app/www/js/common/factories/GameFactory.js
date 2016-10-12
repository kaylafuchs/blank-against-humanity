app.factory('GameFactory', ($http, $rootScope, $localStorage, $q) => {

        const GameFactory = {};

        const initializeFirebase = () => {
            const config = {
                    apiKey: "AIzaSyCihSNkUl_O-xuzVrLZFz_mZJAGcwqJcdE",
                    authDomain: "blankagainsthumanity-a3e7c.firebaseapp.com",
                    databaseURL: "https://blankagainsthumanity-a3e7c.firebaseio.com",
                    storageBucket: "blankagainsthumanity-a3e7c.appspot.com",
                    messagingSenderId: "647415099169"
                  };
            firebase.initializeApp(config);
        };
        initializeFirebase();

        GameFactory.startNewGame = (gameConfig) => {
            //can also get all the decks by team here to prepare
            console.log('the settings are:', gameConfig)
            const teamId = $localStorage.team.id || 2;
            const creatorId = $localStorage.user.id || 3;
            return $http.post('http://192.168.4.225:1337/api/games', {
                    name: gameConfig.name || 'Boring Name',
                    teamId: teamId,
                    creatorId: creatorId,
                    creatorName: $localStorage.user.name || 'dan', //might be unnecessary if we have the user id
                    settings: gameConfig
                })
                .then(res => res.data)
                .then(gameId => {
                    const gameRef = firebase.database().ref(`/teams/${teamId}/games/${gameId}`)
                    gameRef.on('value', snapshot => {
                        console.log('snapshot in gamefactory is:', snapshot.val())
                        $rootScope.$broadcast('changedGame', snapshot.val())
                    });
                    return gameId;
                })

        };

        GameFactory.getCardsByDeckId = (id) => {
            return $http.get(`http://192.168.4.236:1337/api/decks/${id}/cards`)
                .then(res => {
                    console.log('res.data is:', res.data)
                    return res.data
                });
        };

        GameFactory.addDecksToGame = (gameId, decks) => {
            return $http.post(`api/games/${gameId}/decks`, decks)

            // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
            // gameRef.set({
            //     deckId: true
            // })
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
        }


        // GameFactory.createGameByIdFireBase = (firebasegameId) => {
        //     //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //     //needs to be .thenable
        //     const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
        //     newRef.set({
        //         playerId: req.query.playerId
        //     });
        // }

        GameFactory.getDecksByTeamId = (id) => {
            const teamId = (typeof id !== 'number') ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
            return $http.get(`http://localhost:1337/api/decks?team=${teamId}`)
                .then(res => res.data)

        };


        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`http://localhost:1337/api/games/${gameId}/users`);
        };



        GameFactory.getGameByGameId = (gameId) => {
            // const defer = $q.defer();
            console.log(gameId);
            const teamId = 1;
            const gamesRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            return gamesRef.once('value').then(snapshot => {
                console.log('FACTORYTEST', snapshot.val())
                return snapshot.val();
            })

            // return defer.promise;
        };

        // Keep this commented out or the home state will break!!
        // GameFactory.getGamesByTeamId = (teamId) => {
        //     console.log('the team is id', teamId)
        //     teamId = teamId || $localStorage.team.id

        //     const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
        //     return gamesRef.once('value').then(snapshot => { //might break after you do it once
        //         console.log('the val is', snapshot.val())
        //         return snapshot.val();
        //     })
        // };

        GameFactory.getGamesByTeamId = (teamId) => {
            teamId = teamId || $localStorage.team.id
            console.log('the team is id', teamId)
            const defer = $q.defer();

            const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
            gamesRef.on('value', snapshot => {
                console.log('the val is', snapshot.val())
                defer.resolve(snapshot.val());
            });
            console.log("defer promise", defer.promise)
            return defer.promise;
        };

        GameFactory.getGamesByUser = (userId) => {
            return $http.get('http://localStorage:1337/api/games/?userId=' + userId)
                .then(res => res.data)
        }


        return GameFactory;
    }

);

