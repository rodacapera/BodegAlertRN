import firestore from '@react-native-firebase/firestore';

export const getPanicsFirebase = () => {
  const now = Date.now();
  const dbPanics = firestore()
    .collection('panics')
    .where('expiration_time', '>=', now);
  return dbPanics;
};
