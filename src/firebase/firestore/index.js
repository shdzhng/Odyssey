import {
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

async function getAllUsersData() {
  const returnedUsersData = [];
  const data = await getDocs(collection(db, 'users'));
  data.forEach((doc) => returnedUsersData.push(doc.data()));
  return returnedUsersData;
}

async function toggleOnline(command, userRef) {
  await updateDoc(userRef, {
    online: command,
  });
}

async function sendFriendReq(targetUID, userRef) {
  const targetRef = doc(db, 'users', targetUID);
  const userUID = userRef.id;

  const handleReq = async (accountRef, targetUID, reqType) => {
    await updateDoc(accountRef, {
      friends: arrayUnion({
        targetUID,
        reqType,
      }),
    });
  };

  handleReq(userRef, targetUID, 'sent');
  handleReq(targetRef, userUID, 'received');
}

async function acceptFriendReq(item, userRef) {
  await updateDoc(userRef, {
    // friends: arrayUnion(item.name),
  });
}

async function removeFriend(item, userRef) {
  await updateDoc(userRef, {
    // friends: arrayRemove(item.name),
  });
}

async function sendTripInv(item, userRef) {
  await updateDoc(userRef, {
    // trips: arrayUnion(item.name),
  });
}

async function acceptTripInv(item, userRef) {
  await updateDoc(userRef, {
    // trips: arrayUnion(item.name),
  });
}

async function addTrip(item, userRef) {
  await updateDoc(userRef, {
    // trips: arrayUnion(item.name),
  });
}

async function removeTrip(item, userRef) {
  await updateDoc(userRef, {
    // trips: arrayRemove(item.name),
  });
}

export {
  sendFriendReq,
  removeFriend,
  sendTripInv,
  acceptTripInv,
  addTrip,
  removeTrip,
  toggleOnline,
  getAllUsersData,
};
