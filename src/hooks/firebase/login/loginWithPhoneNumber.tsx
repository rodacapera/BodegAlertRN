import auth from '@react-native-firebase/auth';

export const useLogin = async (phoneNumber: string) =>
  await auth().signInWithPhoneNumber(phoneNumber);
