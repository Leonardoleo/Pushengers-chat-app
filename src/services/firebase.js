import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyAKpLlbMuhvwZz_gc9pyvsHGPouBaduX28",
    authDomain: "pushengers.firebaseapp.com",
    databaseURL: "https://pushengers.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();