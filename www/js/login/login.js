app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    })
    $urlRouterProvider.otherwise('/login');
})

app.controller('LoginCtrl', function($scope, $state, UserFactory, $cordovaOauth, $localStorage, $timeout, $ionicSideMenuDelegate) {
    $scope.loginWithSlack = function() {
        return UserFactory.getSlackCreds()
            .then(creds => {
                return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar'])
            })
            .then(info => UserFactory.setUser(info))
            .then(() => $state.go('home'))
    }

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.$on('$ionicView.leave', function() { $ionicSideMenuDelegate.canDragContent(true) });

    $scope.storage = $localStorage

    function redirectUser() {
        console.log("scope storage user", $scope.storage.user)
        if ($scope.storage.user) $state.go('home')
    }

    redirectUser();
})

