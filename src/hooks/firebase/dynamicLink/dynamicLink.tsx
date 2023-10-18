import {firebase} from '@react-native-firebase/auth';

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
