import {
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  getDocs,
  collection,
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

    await updateDoc(accountRef, {
      friends: arrayUnion({
        uid: targetUID,
        reqType: 'accepted',
      }),
    });
  };

  handleReq(userRef, targetUID, reqType);
  handleReq(targetRef, userUID, reqType);
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
  acceptFriendReq,
  sendTripInv,
  acceptTripInv,
  addTrip,
  removeTrip,
  toggleOnline,
};
