module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/BAH',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  SLACK: {
    clientID: '85257560000.86181104260',
    clientSecret: '44aa9b9fef1c578f7424727ec6c1922b',
    callbackURL: 'http://localhost:1337/auth/slack/callback'
  },
  LOGGING: true,
  NATIVE: true
};
