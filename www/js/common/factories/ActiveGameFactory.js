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

    const firebaseMoveSingleKeyValue = (oldRef, newRef) => {
        let removeUpdate = {}
        let newUpdate = {}
        return oldRef.once('value')
            .catch(err => console.log(err))
            .then(snapshot => {
                removeUpdate[snapshot.key] = null
                newUpdate[snapshot.key] = snapshot.val()
                return newRef.update(newUpdate)
            })
            .then(() => oldRef.parent.update(removeUpdate))
    }


    // ActiveGameFactory.submitWhiteCard = (playerId, cardId, gameId, teamId, cardText) => {
    //     const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
    //     const cardToSubmit = gameRef.child(`players/${playerId}/hand/${cardId}`);
    //     const submitRef = gameRef.child('submittedWhiteCards');
    //     firebaseMoveSingleKeyValue(cardToSubmit, submitRef)
    //         .then(() => {
    //             submitRef.child(cardId).set({
    //                 submittedBy: playerId,
    //                 text: cardText
    //             })
    //         })
    // }

    ActiveGameFactory.submitWhiteCard = (playerId, cardId, gameId, teamId) => {
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
          updateObj[playerId].text = text;
          updateObj[playerId].cardId = cardId
          return submitRef.update(updateObj)
        })
        .then(() => console.log('submission success'))
        .catch((err) => console.log(err))
    }



    ActiveGameFactory.pickWinningWhiteCard = (cardId, gameId, teamId) => {
        const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
        let winner = gameRef.child(`submittedWhiteCards/${cardId}/submittedBy`)
        const winningCard = gameRef.child(`submittedWhiteCards/${cardId}`)
        console.log('WINNING CARD', winningCard)
        let blackCardId = '';
        let blackCardWon = {}
        winner.once('value')
            .then(winnerId => {
                winner = winnerId.val();
            })
            .then(() => {
                const setRoundStateToOver = gameRef.child('state').set('postround')
                const awardBlackCard = gameRef.child('currentBlackCard').transaction((currentBlackCard) => {
                        blackCardWon = currentBlackCard.slice(0)
                        return null
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
                return Promise.all([setRoundStateToOver, awardBlackCard])
            })
    }

    return ActiveGameFactory

});