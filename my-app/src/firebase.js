import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDYdwZc1XvhmTedGOB2ALV1D6HjzqeQfrw",
  authDomain: "secrets-91dd7.firebaseapp.com",
  projectId: "secrets-91dd7",
  storageBucket: "secrets-91dd7.appspot.com",
  messagingSenderId: "200284184264",
  appId: "1:200284184264:web:8ef308bb269c0f86850ffd",
  measurementId: "G-E2E3V7T4FJ",
};

let app = firebase.initializeApp(firebaseConfig);

export let db = app.firestore()
export let auth = app.auth()

export default app;
