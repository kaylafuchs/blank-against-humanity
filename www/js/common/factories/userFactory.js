app.factory('UserFactory', function($http, $localStorage) {
    const ourIps = {
        nikita: "192.168.4.213",
        kayla: "192.168.4.225",
        nithya: "192.168.1.48",
    }

    return {
        setUser: function(info) {
            console.log("###GOT TO SET USER")
            return $http({
                    method: 'POST',
                    url: `https://blankagainsthumanity.herokuapp.com/api/users`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: info
                })
                .then(res => {
                    this.setLocalStorage(res.data.user[0], res.data.team[0]);
                })
        },
        getSlackCreds: function() {
            return $http.get(`https://blankagainsthumanity.herokuapp.com/api/slack`)
                .then(res => {
                    return res.data
                })
        },
        getSlackInfo: function() {
            return $http.get('https://slack.com/api/users.identity')
        },

        setLocalStorage: function(user, team) {
            $localStorage.user = user;
            $localStorage.team = team;
            $localStorage.user.games = {};
        },

        logOut: function() {
            $localStorage.$reset();
        }
    }
})

