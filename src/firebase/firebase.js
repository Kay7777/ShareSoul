import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAaugNkfiN3HWIyHr7FinyLzJVrd_e1DwY",
    authDomain: "sharesoul-65788.firebaseapp.com",
    databaseURL: "https://sharesoul-65788.firebaseio.com",
    projectId: "sharesoul-65788",
    storageBucket: "sharesoul-65788.appspot.com",
    messagingSenderId: "128088604078",
    appId: "1:128088604078:web:ca210f8ab7023421669c3f",
    measurementId: "G-HSE6ZN4DNJ"
};

firebase.initializeApp(config);

// SigIn with Google || SignUp with email and password 
// => store credentials into Three places (Authantication, user database, application cache)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

// Firebase Auth: contains whole Authantication methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
