import auth from '@react-native-firebase/auth';

export const useLoginFirebase = async (phoneNumber: string) =>
  await auth()
    .signInWithPhoneNumber(phoneNumber)
    .catch(err => console.debug('errorSingingFirebase', err));
