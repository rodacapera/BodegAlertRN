import firestore from '@react-native-firebase/firestore';

export const getPanicsFirebase = () => {
  const now: number = Date.now();
  const dbPanics = firestore()
    .collection('panics')
    .where('expiration_time', '>=', now);
  return dbPanics;
};
