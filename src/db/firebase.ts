import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
} from 'firebase/firestore';

export const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyBlnBjfNR-4hB4pSYIBuMnbYFP0lSmcXMU',
  authDomain: 'map-tracker-576aa.firebaseapp.com',
  projectId: 'map-tracker-576aa',
  storageBucket: 'map-tracker-576aa.appspot.com',
  messagingSenderId: '442785555128',
  appId: '1:442785555128:web:a4a5eef94caffeee34ca4d',
});

export const firestore = getFirestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const locationsCol = (name: string) => createCollection(name);
