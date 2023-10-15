import {firebase} from '@react-native-firebase/dynamic-links';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getEmployeesFirebase = (shop: any) => {
  const dbUser = firestore().collection('users').where('shop', '==', shop);
  return dbUser;
};

export const getShopFirebase = async (doc: string) => {
  const dbShop = await firestore().collection('shops').doc(doc).get();
  return dbShop.data();
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

export const getDynamicLinkFirebase = async (shop_id: string) => {
  const link = await firebase.dynamicLinks().buildLink({
    link: `https://orlyvisions.vercel.app/dynamiclink/?view=Register&id_shop=${shop_id}`,
    domainUriPrefix: 'https://bodegalert.page.link',
    android: {
      packageName: 'io.cordova.alarmu',
      fallbackUrl:
        'https://play.google.com/store/apps/details?id=io.cordova.alarmu'
    },
    ios: {
      bundleId: 'io.cordova.alarmu',
      appStoreId: 'id1428944146',
      fallbackUrl: 'https://apps.apple.com/us/app/bodegalert/id1428944146'
    }
  });

  return link;
};
