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
                        console.log('snapshot is:', snapshot.val())
                        $rootScope.$broadcast('changedGame', snapshot.val())
                    });
                })

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

        return GameFactory;
    }

);

