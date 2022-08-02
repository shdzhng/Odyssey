import { updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export async function addFriend(item, userRef) {
  await updateDoc(userRef, {
    friends: arrayUnion(item.name),
  });
}
export async function removeFriend(item, userRef) {
  await updateDoc(userRef, {
    friends: arrayRemove(item.name),
  });
}
export async function addTrip(item, userRef) {
  await updateDoc(userRef, {
    trips: arrayUnion(item.name),
  });
}

export async function removeTrip(item, userRef) {
  await updateDoc(userRef, {
    trips: arrayRemove(item.name),
  });
}
