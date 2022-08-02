import React, { useContext, createContext, useState, useEffect } from 'react';
import {
  login,
  signup,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
} from './firebaseAuth';
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { auth } from './firebaseConfig';
import { db } from './firebaseAuth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRef = currentUser ? doc(db, 'users', currentUser.uid) : null;

  useEffect(() => {
    console.log(`userRef is: ${userRef}`);
    if (userRef) {
      const unsub = onSnapshot(userRef, (doc) => {
        setUserData(doc.data());
      });
      return unsub;
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    //authentication
    login,
    signup,
    logout,
    currentUser,
    resetPassword,
    updateEmail,
    updatePassword,

    /// user data
    // userData,
    // addFavorite,
    // removeFavorite,
    // addToShoppingCart,
    // removeFromShoppingCart,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// async function addFavorite(item) {
//   await updateDoc(userRef, {
//     favorites: arrayUnion(item.name),
//   });
// }
// async function removeFavorite(item) {
//   await updateDoc(userRef, {
//     favorites: arrayRemove(item.name),
//   });
// }
// async function addToShoppingCart(item) {
//   await updateDoc(userRef, {
//     shoppingCart: arrayUnion(item.name),
//   });
// }
// async function removeFromShoppingCart(item) {
//   await updateDoc(userRef, {
//     shoppingCart: arrayRemove(item.name),
//   });
// }
