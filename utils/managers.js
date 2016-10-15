const firebase = require('firebase');

const firebaseMoveMultipleKeyValues = (oldRef, newRef) => {
    let removeUpdate = {}
    let addUpdate = {}
    oldRef.once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                addUpdate[childSnapshot.key] = childSnapshot.val()
                removeUpdate[childSnapshot.key] = null
            })
            return newRef.update(addUpdate)
        })
        .then(() => oldRef.ref.update(removeUpdate))
        .catch(err => console.log(err))
}

const pickBlackCard = (gameRef) => {
    const nextBlackCard = gameRef.child('pile/blackcards').orderByKey().limitToFirst(1)
    nextBlackCard.once('value')
        .then(nextBlackCardSnapshot => {
            console.log('value is', nextBlackCardSnapshot.val())
            firebaseMoveMultipleKeyValues(nextBlackCard, gameRef.child('currentBlackCard'))
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

const judgeManager = (playersRef, judgeArr) => {
    playersRef.on('child_added', newPlayerSnapshot => {
        judgeArr.push(newPlayerSnapshot.key);
    })
}

const judgePicker = (judgeArr, gameRef) => {
    const currentJudge = judgeArr.shift();
    gameRef.child('currentJudge').set(currentJudge)
    judgeArr.push(currentJudge)
}

const stateManager = (gameId, teamId, roundTime, minPlayers) => {
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
    const gameStateRef = gameRef.child('state');
    const playersRef = gameRef.child('players');
    const timerRef = gameRef.child('timer')
    const submittedWhiteCardsRef = gameRef.child('submittedWhiteCards')
    console.log(typeof minPlayers)
    console.log('My name is State Manager. Im here to manage states and chew gum, and im all out of gum')
    let judgeArr = [];
    judgeManager(playersRef, judgeArr);
    return gameStateRef.set('pregame')
        .then(() => {
            let playerCount = 0;
            gameStateRef.on('value', (stateSnapshot => {
                switch (stateSnapshot.val()) {
                    case 'pregame':
                        {
                            console.log('game state updated to pregame')
                            pickBlackCard(gameRef)
                            judgePicker(judgeArr, gameRef)
                            console.log(judgeArr)
                            playersRef.on('child_added', () => {
                                playerCount++
                                if (playerCount === minPlayers) {
                                    gameStateRef.set('submission')
                                }
                            })
                            break;
                        }
                    case 'submission':
                        {
                            console.log('game state updated to submission')
                            let submittedWhiteCardsCount = 0
                            submittedWhiteCardsRef.on('child_added', () => {
                                submittedWhiteCardsCount++
                                if (submittedWhiteCardsCount === playerCount) gameStateRef.set('judgement')
                            })
                            if (roundTime) {
                                let currentRoundTime = roundTime * 60
                                const timer = setInterval(() => {
                                    timerRef.set(`${currentRoundTime}`)
                                    currentRoundTime--
                                    if (currentRoundTime === 0) {
                                        clearInterval(timer)
                                        gameStateRef.set('judgement')
                                    }
                                }, 1000)
                            }
                            break;
                        }
                    case 'postround':
                    {
                        console.log('game state updated to postround')
                        pickBlackCard(gameRef);
                        judgePicker(judgeArr, gameRef);
                        let postRoundTime = 60;
                        const timer = setInterval(() => {
                            timerRef.set(`${postRoundTime}`)
                            postRoundTime--
                            if (postRoundTime === 0) {
                                clearInterval(timer)
                                gameStateRef.set('submission')
                            }
                        }, 1000)
                    }
                }
            }))
        })
}

module.exports = {
    stateManager: stateManager
}

