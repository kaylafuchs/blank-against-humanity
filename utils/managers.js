const pickBlackCard = (gameId, teamId) => {
  const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
  firebaseMoveMultipleKeyValues(gameRef.child('pile/blackCards').orderByKey().limitToFirst(1), gameRef.child('currentBlackCard'))
}

const judgeArrManager = () => {
  playersRef.on('child_added', (joinedPlayer) => {
    judgeArr.push(joinedPlayer.key)
    console.log(judgeArr)
  })
}

const judgePicker = () => {
  const currentJudge = judgeArr.shift();
  console.log(currentJudge)
  gameRef.child('currentJudge').set(currentJudge)
  judgeArr.push(currentJudge)
  console.log(judgeArr)
}