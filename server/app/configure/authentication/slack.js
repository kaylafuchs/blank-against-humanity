'use strict';
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;

module.exports = function(app, db) {

    var User = db.model('user');

    var slackConfig = app.getValue('env').SLACK;

    var slackCredentials = {
        clientID: slackConfig.clientID,
        clientSecret: slackConfig.clientSecret,
        callbackURL: slackConfig.callbackURL,
        scope: 'channels:read chat:write:bot team:read',
    };

    var verifyCallback = function(accessToken, refreshToken, profile, done) {

        User.findOrCreate({
                where: {
                    SlackId: profile.id
                }
            })
            .then(function(user) {
                return done(null, user);
            })
            .catch(function(err) {
                console.error('Error creating user from Slack authentication', err);
                done(err);
            })

    };

    passport.use(new SlackStrategy(slackCredentials, verifyCallback));

    app.get('/auth/slack', passport.authorize('slack'));

    app.get('/auth/slack/callback',
        passport.authorize('slack', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication, redirect home.
            console.log("HOLY MOLY IT WORKED")
            res.redirect('/auth/slack/callback');
        });

};
