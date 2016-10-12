const path = require('path');
const Sequelize = require('sequelize');
const firebase = require('firebase')

const env = require(path.join(__dirname, '../env'));
const db = new Sequelize(env.DATABASE_URI, {
    logging: env.LOGGING,
    native: env.NATIVE
});

const initializeFirebase = () => {
    const config = {
        apiKey: "AIzaSyCihSNkUl_O-xuzVrLZFz_mZJAGcwqJcdE",
        authDomain: "blankagainsthumanity-a3e7c.firebaseapp.com",
        databaseURL: "https://blankagainsthumanity-a3e7c.firebaseio.com",
        storageBucket: "blankagainsthumanity-a3e7c.appspot.com",
        messagingSenderId: "647415099169"
    };
    firebase.initializeApp(config);
}
initializeFirebase();

module.exports = db;

