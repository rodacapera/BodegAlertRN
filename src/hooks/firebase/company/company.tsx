import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getEmployees = (shop: any) => {
  const dbUser = firestore().collection('users').where('shop', '==', shop);
  return dbUser;
};

export const getCompanyImages = async (city: string) => {
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

export const getPanics = () => {
  const now = Date.now();
  const dbPanics = firestore()
    .collection('panics')
    .where('expiration_time', '>=', now);
  return dbPanics;
};

export const getButtons = (shop: any) => {
  const dbPanics = firestore().collection('buttons').where('shop', '>=', shop);
  return dbPanics;
};
