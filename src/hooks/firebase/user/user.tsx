import firestore from '@react-native-firebase/firestore';
import {User} from '@src/types/userTypes';

export const getUserFirebase = async (userUid: string) => {
  const dbUser = await firestore().collection('users').doc(userUid).get();
  return dbUser.data();
};

export const editUserFirebase = async (user: User) => {
  await firestore().collection('users').doc(user.user_uid).update(user);
  return user;
};
