import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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
        storyID: [],
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

// Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


// Storage
export const storage = firebase.storage();

// Upload Image into Storage (now all done in the createstory.jsx file)


// create Story database and update storyID into  user database
export const createStoryDocument = async (currentUser, {imageURL, story}) => {
  if (!currentUser) return;
  const storyID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const userRef = firestore.doc(`stories/${storyID}`);
  const createdAt = new Date();
  try {
    await userRef.set({
        imageURL,
        story,
        createdAt
    });
    await insertStoryIDIntoUserDatabase(storyID, currentUser.id);
  } catch (error) {
    console.log('Error creating user: ', error.message);
  }
  return userRef;
}
// Funtion: update storyID into  user database
const insertStoryIDIntoUserDatabase = async (storyID, userID) => {
  const userRef = await firestore.doc(`users/${userID}`);
  await userRef.get().then( doc => {
    let story = doc.data().storyID;
    story.push(storyID);
    userRef.set({storyID: story},{merge:true});
  })
}


// retrieve all stories
export const getAllStory = async () => {
  let array = [];
  const storyRef = await firestore.collection("stories");
  await storyRef.get().then( snapShots => {
    snapShots.forEach( doc => {
      const story = [doc.id, doc.data().imageURL, doc.data().story];
      array.push(story);
    })
  })
  return array;
  
}



export default firebase;
