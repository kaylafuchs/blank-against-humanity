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
        apiKey: "AIzaSyD-tDevXvipyuE5lzheWARq4huu1UmqoJk",
        authDomain: "capstone-fb0e8.firebaseapp.com",
        databaseURL: "https://capstone-fb0e8.firebaseio.com",
        storageBucket: "capstone-fb0e8.appspot.com",
        messagingSenderId: "849839680107"
    };
    firebase.initializeApp(config);
};
initializeFirebase();

module.exports = db;