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
        let cardsNeeded = 0
        const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`)
        const handRef = gameRef.child(`players/${playerId}/hand`)
        const pileRef = gameRef.child('pile/whitecards')
        return handRef.once('value', handSnapshot => {
                cardsNeeded = 7 - handSnapshot.numChildren()
            })
            .then(() => {
                return refiller(cardsNeeded, pileRef, handRef)
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

    ActiveGameFactory.submitWhiteCard = (playerId, cardId, gameId, teamId) => {
        const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
        const cardToSubmit = gameRef.child(`players/${playerId}/hand/${cardId}`);
        const submitRef = gameRef.child('submittedWhiteCards');
        firebaseMoveSingleKeyValue(cardToSubmit, submitRef)
            .then(() => {
                console.log(cardToSubmit, submitRef)
                submitRef.child(cardId).set({
                    submittedBy: playerId
                })
            })
    }

    return ActiveGameFactory;


});

