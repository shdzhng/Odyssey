import React, { useContext, createContext, useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import {
  login,
  signup,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
} from './firebaseAuth';
import {
  sendFriendReq,
  removeFriend,
  toggleOnline,
  sendTripInv,
  acceptTripInv,
  addTrip,
  removeTrip,
  getAllUsersData,
} from './firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRef = currentUser ? doc(db, 'users', currentUser.uid) : null;

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setUsersData(usersData);
    });

    return unsub;
  }, []);

  useEffect(() => {
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
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,

    /// data
    usersData,

    /// user
    userRef,
    toggleOnline,
    sendFriendReq,
    removeFriend,
    sendTripInv,
    acceptTripInv,
    addTrip,
    removeTrip,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
