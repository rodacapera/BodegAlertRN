import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types/globalTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

const Register = ({navigation}: RegisterProps) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
