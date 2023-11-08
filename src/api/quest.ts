import {
  doc, getDocs, setDoc, updateDoc,
} from 'firebase/firestore';
import { locationsCol } from '../db/firebase';
import { questQueue } from '../data-structure';

export const updateQuests = async () => {
  const questsDocRef = doc(locationsCol('locations'), 'Quest');

  await updateDoc(questsDocRef, JSON.parse(JSON.stringify(questQueue)));
};

export const initializeQuests = async () => {
  const locationRef = doc(
    locationsCol('locations'),
    'Quest',
  );

  await setDoc(locationRef, JSON.parse(JSON.stringify(questQueue)));
};

export const getQuests = async () => {
  const locationsDocs = await getDocs(locationsCol('locations'));
  let data = null;

  locationsDocs.docs.map((locationDoc) => {
    data = locationDoc.data().first;

    return 0;
  });

  return data;
};
