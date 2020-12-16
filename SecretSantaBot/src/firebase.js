"use strict";
exports.__esModule = true;
exports.auth = exports.db = void 0;
var firebase_1 = require("firebase");
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYdwZc1XvhmTedGOB2ALV1D6HjzqeQfrw",
    authDomain: "secrets-91dd7.firebaseapp.com",
    projectId: "secrets-91dd7",
    storageBucket: "secrets-91dd7.appspot.com",
    messagingSenderId: "200284184264",
    appId: "1:200284184264:web:8ef308bb269c0f86850ffd",
    measurementId: "G-E2E3V7T4FJ"
};
firebase_1["default"].initializeApp(firebaseConfig);
exports.db = firebase_1["default"].firestore();
exports.auth = firebase_1["default"].auth();
exports["default"] = firebase_1["default"];
