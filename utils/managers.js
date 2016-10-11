const pickBlackCard = (gameId, teamId) => {
  const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
  firebaseMoveMultipleKeyValues(gameRef.child('pile/blackCards').orderByKey().limitToFirst(1), gameRef.child('currentBlackCard'))
}

