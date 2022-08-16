import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig.js';
import { db } from '../firebaseConfig.js';

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signup(email, password, firstName, lastName) {
  auth.createUserWithEmailAndPassword(email, password).then(async (cred) => {
    const uid = cred.user.uid;
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      uid,
      online: true,
      friends: [],
      tripsInvite: [],
      tripsAccepted: [],
    };
    await setDoc(doc(db, 'users', uid), newUserData);
  });
}

export function logout(currentUser) {
  return auth.signOut();
}
export function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

export function updateEmail(email, currentUser) {
  return currentUser.updateEmail(email);
}

export function updatePassword(password, currentUser) {
  return currentUser.updatePassword(password);
}
