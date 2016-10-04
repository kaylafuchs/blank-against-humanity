angular.module('myApp', []).controller('MainCtrl', function($scope) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAjm8gBlobk922u5APxv3SB-9KnjQwJqmw",
        authDomain: "blankagainst.firebaseapp.com",
        databaseURL: "https://blankagainst.firebaseio.com",
        storageBucket: "blankagainst.appspot.com",
        messagingSenderId: "580664847840"
    };
    firebase.initializeApp(config);

    $scope.comment = {};
    $scope.signIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    };

    $scope.signOut = () => {
        firebase.auth().signOut();
    };

    $scope.comments = [{
        text: 'seed',
        username: 'firstuser'
    }];


    $scope.addComment = (comment) => {
        var newRef = firebase.database().ref().child('comments').push()
        newRef.set({
            username: comment.username,
            text: comment.text
        })

    }

    const readComments = () => {
        console.log('checking comments')

        var commentsRef = firebase.database().ref('comments/');

        commentsRef.on('child_added', function(datas) {
            console.log('data from child added', datas.val())
            console.log('the scope is', $scope)
            let comment = {};
            comment.text = datas.val().text;
            comment.username = datas.val().username;
            $scope.comments.push(comment);
            $scope.$evalAsync();
        })
    }

    readComments()
})