app.directive('winner', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/winner.html',
        controller: 'GameCtrl'
    }
});

