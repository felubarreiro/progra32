import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAgbC9a4bbUIY8brv9jV2wzDIzoM8FSB50",
  authDomain: "progra32.firebaseapp.com",
  projectId: "progra32",
  storageBucket: "progra32.firebasestorage.app",
  messagingSenderId: "814609061503",
  appId: "1:814609061503:web:334bca46a6341b7043d14a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();