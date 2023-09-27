import firestore from '@react-native-firebase/firestore';

export const getEmployees = async (shop: any) => {
  //   console.log('shop', shop);
  const dbUser = await firestore()
    .collection('users')
    .where('shop', '==', shop)
    .get();
  return dbUser;
};
