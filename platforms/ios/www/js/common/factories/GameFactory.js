<<<<<<< HEAD
app.factory('GameFactory', ($http, $rootScope, $localStorage) => {
=======
app.factory('GameFactory', ($http, $rootScope, $localStorage, $q) => {
>>>>>>> master
        const GameFactory = {};

        const initializeFirebase = () => {
            const config = {
<<<<<<< HEAD
                apiKey: "AIzaSyD-tDevXvipyuE5lzheWARq4huu1UmqoJk",
                authDomain: "capstone-fb0e8.firebaseapp.com",
                databaseURL: "https://capstone-fb0e8.firebaseio.com",
                storageBucket: "capstone-fb0e8.appspot.com",
                messagingSenderId: "849839680107"
            };
=======
                    apiKey: "AIzaSyAvQ7yQ7fKIUUOxEqHP2-hCBLzuMkdoXko",
                    authDomain: "blank-against-humanity-d9cbf.firebaseapp.com",
                    databaseURL: "https://blank-against-humanity-d9cbf.firebaseio.com",
                    storageBucket: "blank-against-humanity-d9cbf.appspot.com",
                    messagingSenderId: "778108071646"
                  };
>>>>>>> master
            firebase.initializeApp(config);
        };
        initializeFirebase();

<<<<<<< HEAD
        GameFactory.startNewGame = (gameConfig) => {
            //can also get all the decks by team here to prepare
            console.log('the settings are:', gameConfig)
            const teamId = $localStorage.team.id || 2;
            const creatorId = $localStorage.user.id || 3;
            return $http.post('http://192.168.4.236:1337/api/games', {
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
=======
        GameFactory.startNewGame = (gameName, teamId) => {
            //return $http.get('/session').then(userId => {
            //can also get all the decks by team here to prepare
            return $http.post('http://localhost:1337/api/games', {
                    name: gameName || 'Boring Name',
                    teamId: teamId || 2,

                    creatorId: 2
                })
                .then(res => res.data)
                .then(gameId => {
                    console.log('the gameid is:', gameId)
                        //const reff = firebase.database().ref(`/games/`)
                    const reff = firebase.database().ref(`/games/${gameId}`)
                    reff.on('value', snapshot => {
>>>>>>> master
                        console.log('snapshot is:', snapshot.val())
                        $rootScope.$broadcast('changedGame', snapshot.val())
                    });
                })
<<<<<<< HEAD

        };

        //see all decks for the team


        GameFactory.addCardToGame = (gameId) => {

        }

        GameFactory.addDecksToGame = (gameId, decks) => {
            return $http.post(`api/games/${gameId}/decks`, decks)

            // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
            // gameRef.set({
            //     deckId: true
            // })
        }

        GameFactory.joinGameById = (id) => {
                const teamId = $localStorage.team.id;
                const playerId = $localStorage.user.id;
                const playerName = $localStorage.user.name;

                const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/players/${playerId}`)
                gameRef.set({
                    name: playerName
                })
            }
            // GameFactory.joinGameById = (gameId) => {
            //     console.log('joining game')
            //         //var playersTeam = 
            //     var gameId = 8;
            //     var playerId = 2; //eventually make it get current 
            //     return $http.post(`http://localhost:1337/api/games/${gameId}?playerId=${playerId}` }

        //vs getCardsByTeamId
        GameFactory.getDecksByTeamId = (id) => {
            const teamId = (typeof id !== 'number') ? $localStorage.team.id : id; // uses localstorage unless id param is provided
            return $http.get(`http://192.168.4.236:1337/api/decks/?team=${teamId}`)
                .then(res => {
                    console.log('res', res.data)
                    return res.data
                })
        };

        GameFactory.getCardsByDeckId = (id) => {
            return $http.get(`http://192.168.4.236:1337/api/decks/${id}/cards`)
                .then(res => {
                    console.log('res.data is:', res.data)
                    return res.data
                });
        }

        //GameFactory.getCardsByDeckId 

        //GameFactory.getBaseDeck

        // GameFactory.getCardsByCreator = (userId) => {

        // }

        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`http://localhost:1337/api/games/${gameId}/users`);
        };



        GameFactory.getGameByGameId = (gameId) => {
            const teamId = $localStorage.team.id
            const gamesRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            return gamesRef.once('value').then(snapshot => {
                return snapshot.val();
            })
        }

        GameFactory.getGamesByTeamId = (teamId) => {
            console.log('the team is id', teamId)

            const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
            return gamesRef.once('value').then(snapshot => { //might break after you do it once
                    console.log('the val is', snapshot.val())
                    return snapshot.val();
                })
                // return $http.get(`http://localhost:1337/api/games?teamId=${teamId}`)
                //     .then(res => res.data)
                //.then(foundGames => )
        };


        //get all games by team route
=======
                //set up watcher
        };


        GameFactory.addCardToGame = (gameId) => {

        }

        GameFactory.addDecksToGame = (gameId, decks) => {
            return $http.post(`api/games/${gameId}/decks`, decks)

            // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
            // gameRef.set({
            //     deckId: true
            // })
        }

        GameFactory.joinGameById = (gameId) => {
            const teamId = 'team';
            const playerId = 2;
            const playerName = 'poop';
            const playerRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/players/${playerId}`)
            playerRef.set({
                name: playerName
            })
            const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
            gameRef.on('value', snapshot => {
                $rootScope.$broadcast('changedGame', snapshot.val());
            })
        }
            

        GameFactory.createGameByIdFireBase = (firebasegameId) => {
            //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
            //needs to be .thenable
            const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
            newRef.set({
                playerId: req.query.playerId
            });
        }

        // }

        GameFactory.getDecksByTeamId = (teamId) => {

            return $http.get(`http://localhost:1337/api/decks/${teamId}`)
                .the(res => res.data)

        };

        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`http://localhost:1337/api/games/${gameId}/users`);
        };



        GameFactory.getGameByGameId = (gameId) => {
            const teamId = $localStorage.team.id
            console.log(teamId);
            const gamesRef = firebase.database().ref(`teams/2/games/${gameId}`)
            return gamesRef.on('value').then(snapshot => {
                return snapshot.val();
            })
        };

        // GameFactory.getGamesByTeamId = (teamId) => {
        //     console.log('the team is id', teamId)

        //     const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
        //     return gamesRef.once('value').then(snapshot => { //might break after you do it once
        //             console.log('the val is', snapshot.val())
        //             return snapshot.val();
        //         })
        // };

        GameFactory.getGamesByTeamId = (teamId) => {
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
>>>>>>> master

        return GameFactory;
    }

<<<<<<< HEAD
);

=======
        return GameFactory;
    }

);
>>>>>>> master
