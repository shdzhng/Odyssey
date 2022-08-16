import {
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
        uid: targetUID,
        reqType,
      }),
    });
  };

  handleReq(userRef, targetUID, 'sent');
  handleReq(targetRef, userUID, 'received');
}

async function removeFriend(targetUID, userRef, reqType) {
  const targetRef = doc(db, 'users', targetUID);
  const userUID = userRef.id;

  const handleReq = async (accountRef, targetUID, reqType) => {
    await updateDoc(accountRef, {
      friends: arrayRemove({
        uid: targetUID,
        reqType,
      }),
    });
  };

  handleReq(userRef, targetUID, reqType);
  handleReq(targetRef, userUID, reqType);
}

async function acceptFriendReq(targetUID, userRef, reqType) {
  const targetRef = doc(db, 'users', targetUID);
  const userUID = userRef.id;

  const handleReq = async (accountRef, targetUID, reqType) => {
    await updateDoc(accountRef, {
      friends: arrayRemove({
        uid: targetUID,
        reqType,
      }),
    });
    reqType = 'accepted';
    await updateDoc(accountRef, {
      friends: arrayUnion({
        uid: targetUID,
        reqType,
      }),
    });
  };

  handleReq(userRef, targetUID, reqType);
  handleReq(targetRef, userUID, 'sent');
}

async function createTrip(payload) {
  const { invitation, id, createdBy } = payload;

  const updateTrip = async (userId, tripId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      trips: arrayUnion(tripId),
    });
  };

  await setDoc(doc(db, 'trips', `${payload.id}`), payload);

  updateTrip(createdBy.uid, id);

  for (const userId of invitation) {
    updateTrip(userId, id);
  }
}

async function sendTripInv(tripId, userId) {}

async function acceptTripInv(item, userRef) {}

async function removeTrip(item, userRef) {}

export {
  sendFriendReq,
  removeFriend,
  acceptFriendReq,
  sendTripInv,
  acceptTripInv,
  createTrip,
  removeTrip,
  toggleOnline,
};
