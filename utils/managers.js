const pickBlackCard = (gameRef) => {
  firebaseMoveMultipleKeyValues(gameRef.child('pile/blackCards').orderByKey().limitToFirst(1), gameRef.child('currentBlackCard'))
}

const judgeArrManager = (playersRef, judgeArr) => {
  playersRef.on('child_added', (joinedPlayer) => {
    judgeArr.push(joinedPlayer.key)
  })
}

const judgePicker = (judgeArr) => {
  const currentJudge = judgeArr.shift();
  console.log(currentJudge)
  gameRef.child('currentJudge').set(currentJudge)
  judgeArr.push(currentJudge)
  console.log(judgeArr)
}

const stateManager = (gameId, teamId, roundTime) => {
  const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
  const gameStateRef = gameRef.child('state');
  const playersRef = gameRef.child('players');
  const nextBlackCard = gameRef.child('pile/blackCards').orderByKey().limitToFirst(1)

  gameStateRef.set('pregame')
    .then(() => {
      gameStateRef.on('value', (stateSnapshot => {
        let playerCount = 0;
        let judgeArr = []
        judgeArrManager(playersRef, judgeArr)
        switch (stateSnapshot.val()) {
          case 'pregame':
            {
              pickBlackCard(gameId, teamId)
              gameStateRef.parent.child('players').on('child_added', newPlayerSnapshot => {
                playerCount++
                if (playerCount === 4) gameStateRef.set('submission')
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
module.exports = {
  stateManager: stateManager
}
