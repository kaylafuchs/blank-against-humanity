app.factory('GameFactory', ($http, $rootScope, $localStorage) => {
        const GameFactory = {};

        const initializeFirebase = () => {
            const config = {
                apiKey: "AIzaSyD-tDevXvipyuE5lzheWARq4huu1UmqoJk",
                authDomain: "capstone-fb0e8.firebaseapp.com",
                databaseURL: "https://capstone-fb0e8.firebaseio.com",
                storageBucket: "capstone-fb0e8.appspot.com",
                messagingSenderId: "849839680107"
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

        GameFactory.joinGameById = (gameId) => {
                const teamId = $localStorage.team.id;
                const playerId = $localStorage.user.id
                const playerName = $localStorage.user.name

                //teamid
                //playerid
                //name
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
            //     return $http.post(`http://localhost:1337/api/games/${gameId}?playerId=${playerId}`, {

        //     })
        // }

        //
        GameFactory.createGameByIdFireBase = (firebasegameId) => {
            //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
            //needs to be .thenable
            const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
            newRef.set({
                playerId: req.query.playerId
            });
        }

        // }


        //vs getCardsByTeamId
        GameFactory.getDecksByTeamId = (teamId) => {

            return $http.get(`http://localhost:1337/api/decks/${teamId}`)
                .the(res => res.data)

        };

        // GameFactory.getCardsByCreator = (userId) => {

        // }

        GameFactory.getUsersByGameId = (gameId) => {
            return $http.get(`http://localhost:1337/api/games/${gameId}/users`);
        };


        GameFactory.getGamesByUserId = (userId) => {
                return $http.get(`http://localhost:1337/api/games/?userId=${userId}`)
                    .then(res => res.data)
            }
            // .then(createdGame =>
            //     //addwatcher to game id in firebase)
            //     return createdGame
            // };



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

        return GameFactory;
    }

);
