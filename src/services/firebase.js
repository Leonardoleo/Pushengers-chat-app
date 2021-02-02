import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyAKpLlbMuhvwZz_gc9pyvsHGPouBaduX28",
    authDomain: "pushengers.firebaseapp.com",
    databaseURL: "https://pushengers.firebaseio.com",
    projectId: "pushengers",
    storageBucket: "pushengers.appspot.com",
    messagingSenderId: "234937355452",
    appId: "1:234937355452:web:0a6d8989ddc91ee3a9d4b9",
    measurementId: "G-06F0FJ48XJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();