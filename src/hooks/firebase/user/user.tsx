import firestore from '@react-native-firebase/firestore';

export const getUser = async (userUid: string) => {
  const dbUser = await firestore().collection('users').doc(userUid).get();
  return dbUser.data();
};

export const getPanics = async (userUid: string) => {
  const now = Date.now();
  const dbPanics = await firestore()
    .collection('panics')
    .where('expiration_time', '>=', now)
    .get();

  return dbPanics;
};
