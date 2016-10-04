app.config(($stateProvider) => {
    $stateProvider.state('game', {
        url: '/game',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {
    $scope.startNewGame = GameFactory.startNewGame;
})