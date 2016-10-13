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
  const nextBlackCard = gameRef.child('pile/blackCards').orderByKey().limitToFirst(1)
  firebaseMoveMultipleKeyValues(nextBlackCard, gameRef.child('currentBlackCard'))
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

const stateManager = (gameId, teamId, roundTime) => {
  const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
  const gameStateRef = gameRef.child('state');
  const playersRef = gameRef.child('players');
  let judgeArr = [];
  judgeManager(playersRef, judgeArr);
  gameStateRef.set('pregame')
    .then(() => {
      gameStateRef.on('value', (stateSnapshot => {
        let playerCount = 0;
        switch (stateSnapshot.val()) {
          case 'pregame':
            {
              gameRef.child('pile/blackCards').on('value', () => {
                gameRef.child('currentBlackCard').once('value')
                .then(currentBCsnapshot => {ß
                  if (!currentBCsnapshot.val()) pickBlackCard(gameRef)
                })
              })
              judgePicker(judgeArr, gameRef)
              gameStateRef.parent.child('players').on('child_added', () => {
                playerCount++
                if (playerCount === 4) {
                  gameStateRef.set('submission')
                }
              })
              break;
            }
          case 'submission':
            {
              let submittedWhiteCardsCount = 0
              gameStateRef.parent.child('submittedWhiteCards').on('child_added', () => {
                submittedWhiteCardsCount++
                if (submittedWhiteCardsCount === playerCount) gameStateRef.set('judgement')
              })
              if (roundTime) {
                let currentRoundTime = roundTime
                const timer = setInterval(() => {
                  gameStateRef.parent.child('roundTime').set(`${currentRoundTime}`)
                  currentRoundTime--
                  if (currentRoundTime === 0) {
                    clearInterval(timer)
                    gameStateRef.set('judgement')
                  }
                }, 1000)
              }
              break;
            }
        }
      }))
    })
}

stateManager(1,2)
module.exports = {
  stateManager: stateManager
}