const firebaseConfig = {
    apiKey: "AIzaSyCPA5xNO3YPwtJSVrYHCxFCmIkMYkhdhWc",
    authDomain: "js-project-92c8d.firebaseapp.com",
    projectId: "js-project-92c8d",
    storageBucket: "js-project-92c8d.firebasestorage.app",
    messagingSenderId: "629295037407",
    appId: "1:629295037407:web:d929a43135e6131cd4226a"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();