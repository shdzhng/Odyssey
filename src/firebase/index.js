import React, { useContext, createContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import {
  login,
  signup,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
} from './firebaseAuth';
import { addFriend, removeFriend, addTrip, removeTrip } from './firestore';

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
    if (userRef) {
      const unsub = onSnapshot(userRef, (doc) => {
        console.log(doc.data());
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
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,

    /// user data
    addFriend,
    removeFriend,
    addTrip,
    removeTrip,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
