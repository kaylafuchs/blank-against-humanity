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
            apiKey: "AIzaSyAvQ7yQ7fKIUUOxEqHP2-hCBLzuMkdoXko",
            authDomain: "blank-against-humanity-d9cbf.firebaseapp.com",
            databaseURL: "https://blank-against-humanity-d9cbf.firebaseio.com",
            storageBucket: "blank-against-humanity-d9cbf.appspot.com",
            messagingSenderId: "778108071646"
          };
    firebase.initializeApp(config);
};
initializeFirebase();

module.exports = db;