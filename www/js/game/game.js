app.config(($stateProvider) => {
    $stateProvider.state('game', {
        url: '/game',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {
    $scope.test = 'hey'
    $scope.func = GameFactory.test
    $scope.startNewGame = GameFactory.startNewGame;
})