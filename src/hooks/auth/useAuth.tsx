import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUseAuth = async () => {
  const result = await AsyncStorage.getItem('@userAuth');
  return result ? JSON.parse(result) : null;
};
