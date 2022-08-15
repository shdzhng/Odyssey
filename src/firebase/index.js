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
  acceptFriendReq,
  acceptTripInv,
  createTrip,
  removeTrip,
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
  const [friendsList, setFriendsList] = useState({});
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [friendsOffline, setFriendsOffline] = useState([]);
  const [incomingFriends, setIncomingFriends] = useState([]);
  const [outgoingFriends, setOutgoingFriends] = useState([]);

  const userRef = currentUser ? doc(db, 'users', currentUser.uid) : null;

  //update friends data
  useEffect(() => {
    if (userData) {
      const returnedList = {};
      userData.friends.forEach(({ uid, reqType }) => {
        const friendData = Object.values(usersData).filter(
          (user) => user.uid === uid
        )[0];

        returnedList[uid] = { reqType, ...friendData };
      });
      setFriendsList(returnedList);
    }
  }, [userData]);

  //prune friends list into two branches: online and offline
  useEffect(() => {
    const friends = Object.values(friendsList);
    setFriendsOnline(
      friends.filter(({ online, reqType }) => online && reqType === 'accepted')
    );
    setFriendsOffline(
      friends.filter(({ online, reqType }) => !online && reqType === 'accepted')
    );
    setOutgoingFriends(friends.filter(({ reqType }) => reqType === 'sent'));
    setIncomingFriends(friends.filter(({ reqType }) => reqType === 'received'));
  }, [friendsList]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const snapshotData = doc.data();
        if (snapshotData.uid === currentUser.uid) {
          setUserData(snapshotData);
        } else {
          usersData.push(snapshotData);
        }
      });
      setUsersData(usersData);
    });

    return unsub;
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
    userRef,

    ///user data
    friendsList,
    friendsOnline,
    friendsOffline,
    incomingFriends,
    outgoingFriends,
    acceptFriendReq,

    ///all data
    usersData,
    userData,

    //friends functionality
    toggleOnline,
    sendFriendReq,
    removeFriend,

    // trip functionality
    sendTripInv,
    acceptTripInv,
    createTrip,
    removeTrip,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
