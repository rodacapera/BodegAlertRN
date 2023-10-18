import firestore from '@react-native-firebase/firestore';

export const getEmployeesFirebase = (shop: any) => {
  const dbUser = firestore().collection('users').where('shop', '==', shop);
  return dbUser;
};
