import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCzYMDhw0q3MaRMlCrbPewIAvA4mDxWBVs',
  authDomain: 'odyssey-2c9e3.firebaseapp.com',
  projectId: 'odyssey-2c9e3',
  storageBucket: 'odyssey-2c9e3.appspot.com',
  messagingSenderId: '518944733252',
  appId: '1:518944733252:web:bdd668beeb0bfe5539a411',
  measurementId: 'G-G605LZ0ZS7',
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = app.auth();
export default app;
