import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getEmployeesFirebase = (shop: any) => {
  const dbUser = firestore().collection('users').where('shop', '==', shop);
  return dbUser;
};

export const getCompanyImagesFirebase = async (city: string) => {
  const reference = storage().ref(`logos/${city}/`);
  const list = (await reference.list()).items;
  const loop = await Promise.all(
    list.map(async value => {
      const data = {path: await value.getDownloadURL()};
      return data;
    })
  );
  return loop;
};

export const getPanicsFirebase = () => {
  const now = Date.now();
  const dbPanics = firestore()
    .collection('panics')
    .where('expiration_time', '>=', now);
  return dbPanics;
};

export const getButtonsFirebase = (shop: any) => {
  const dbPanics = firestore().collection('buttons').where('shop', '>=', shop);
  return dbPanics;
};
