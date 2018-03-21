import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCkKvZkGqdfPMUEECbHOtyXifE1IMt3vuw",
  authDomain: "proto-star-dc4ea.firebaseapp.com",
  databaseURL: "https://proto-star-dc4ea.firebaseio.com",
  projectId: "proto-star-dc4ea",
  storageBucket: "",
  messagingSenderId: "544787556335"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;