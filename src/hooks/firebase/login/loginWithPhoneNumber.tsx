import auth from '@react-native-firebase/auth';

export const useLoginFirebase = async (phoneNumber: string) =>
  await auth().signInWithPhoneNumber(phoneNumber);
