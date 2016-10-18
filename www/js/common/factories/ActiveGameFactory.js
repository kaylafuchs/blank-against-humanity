app.factory('ActiveGameFactory', ($http, $rootScope, $localStorage) => {

    const ActiveGameFactory = {};

    const refiller = (cardsNeeded, pileRef, handRef) => {
        return pileRef.limitToFirst(cardsNeeded).once('value', cardsSnapshot => {
                cardsSnapshot.forEach(card => {
                    let updateObj = {}
                    card.ref.transaction(cardData => {
                            updateObj[card.key] = cardData
                            return null
                        })
                        .then(() => handRef.update(updateObj))
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))
    }

    ActiveGameFactory.refillMyHand = (gameId, playerId, teamId) => {
        // how many cards do I need?
        console.log("refilling hand")
        let cardsNeeded = 0
        const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
        const handRef = gameRef.child(`players/${playerId}/hand`)
        const pileRef = gameRef.child('pile/whitecards')
        handRef.once('value', handSnapshot => {
                cardsNeeded = 7 - handSnapshot.numChildren()
            })
            .then(() => {
                refiller(cardsNeeded, pileRef, handRef)
                console.log("made it to refiller")
            })
    }

    ActiveGameFactory.submitWhiteCard = (playerId, cardId, gameId, teamId) => {
        console.log('test')
        const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
        const cardToSubmit = gameRef.child(`players/${playerId}/hand/${cardId}/text`);
        const submitRef = gameRef.child('submittedWhiteCards');
        let text = ''
        return cardToSubmit.transaction(cardText => {
                text = cardText
                return null
            })
            .then(() => {
                let updateObj = {};
                updateObj[playerId] = {
                    text: text,
                    playerId: playerId
                }
                console.log('updateobj', updateObj)
                return submitRef.update(updateObj)
            })
            .then(() => console.log('submission success'))
            .catch((err) => console.log(err))
    }



    ActiveGameFactory.pickWinningWhiteCard = (cardId, gameId, teamId) => {
            const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
            let playerRef = gameRef.child(`submittedWhiteCards/${cardId}/playerId`)
            const winningCard = gameRef.child(`submittedWhiteCards/${cardId}`)
            console.log('WINNING CARD', winningCard)
            let blackCardWon = {}
            let winner = ''
            playerRef.once('value')
                .then(playerIdSnap => {
                    winner = playerIdSnap.val();
                    return gameRef.child('currentBlackCard').transaction((currentBlackCard) => {
                            console.log(typeof currentBlackCard)
                            blackCardWon = Object.keys(currentBlackCard)[0]
                            return null
                        })
                })
                .then(() => {
                    console.log("####BLACK CARD WON", blackCardWon)
                    gameRef.child(`players/${winner}/blackCardsWon`).set(blackCardWon)
                    return winningCard.once('value')
                })
                .then(winningCardSnapshot => {
                    console.log('SNAPSHOT', winningCardSnapshot.val());
                    winningCardSnapshot = winningCardSnapshot.val();
                    return gameRef.child(`winningCard`).set(winningCardSnapshot)
                })
                .then(() => gameRef.child('submittedWhiteCards').remove())
                .then(() => gameRef.child('currentBlackCard').remove())
                .then(() => gameRef.child('state').set('postround'))
                .catch((err) => console.log(err))
        }
    return ActiveGameFactory

});