import firestore from '@react-native-firebase/firestore';

export const getButtonsFirebase = (shop: any) => {
  const dbPanics = firestore().collection('buttons').where('shop', '>=', shop);
  return dbPanics;
};
