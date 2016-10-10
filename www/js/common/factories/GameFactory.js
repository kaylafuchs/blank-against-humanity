app.factory('GameFactory', ($http, $rootScope, $localStorage) => {
        const GameFactory = {};

        const initializeFirebase = () => {
            const config = {
                apiKey: "AIzaSyCved6m8mUtuuqVmScEQEK_TMQIvcIoVoQ",
                authDomain: "blank-against-humanity-9f962.firebaseapp.com",
                databaseURL: "https://blank-against-humanity-9f962.firebaseio.com",
                storageBucket: "blank-against-humanity-9f962.appspot.com",
                messagingSenderId: "1032852247621"
            };
            firebase.initializeApp(config);
        };
        initializeFirebase();

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
                        console.log('snapshot is:', snapshot.val())
                        $rootScope.$broadcast('changedGame', snapshot.val())
                    });
                })
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

        GameFactory.getGamesByTeamId = (teamId) => {
            console.log('the team is id', teamId)

            const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
            return gamesRef.once('value').then(snapshot => { //might break after you do it once
                    console.log('the val is', snapshot.val())
                    return snapshot.val();
                })
        };


        return GameFactory;
    }

);
