import firestore from '@react-native-firebase/firestore';

export const getUser = async (userUid: string) => {
  const dbUser = await firestore().collection('users').doc(userUid).get();
  return dbUser.data();
};
