/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    DATABASE_URI: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SLACK: {
        consumerKey: process.env.SLACK_CONSUMER_KEY,
        consumerSecret: process.env.SLACK_CONSUMER_SECRET,
        callbackUrl: process.env.SLACK_CALLBACK
    },
    LOGGING: true,
    NATIVE: true
};
