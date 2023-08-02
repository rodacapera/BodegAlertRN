import {View} from 'react-native';
import React, {useState} from 'react';
import {loginFormStyles} from '../styles/loginFormStyles';
import PhoneInput from 'react-native-phone-input';
import {TextInput} from 'react-native-paper';
import {lightTheme} from '@src/hooks/lightMode';
import {LoginFormAction} from '@src/types/loginTypes';

const InputForm = ({
  phoneRef,
  setButtonAction,
}: {
  phoneRef: any;
  setButtonAction: (data: LoginFormAction) => void;
}) => {
  const [phone, setPhone] = useState('');
  const [focusPhone, setFocusPhone] = useState(false);

  const handlePhoneNumber = (text: string) => {
    let myPhone = phoneRef.current.getCountryCode();
    myPhone = `+${myPhone} ${text}`;
    setButtonAction({name: 'login', show: false, phone: myPhone, logged: true});
    setPhone(text);
  };

  return (
    <View
      style={[
        loginFormStyles.phoneInputContainer,
        {borderBottomWidth: focusPhone ? 1.9 : 0.7},
      ]}>
      <View style={loginFormStyles.phoneFlagContent}>
        <PhoneInput
          ref={ref => {
            phoneRef.current = ref;
          }}
          textStyle={loginFormStyles.flagText}
          initialCountry={'co'}></PhoneInput>
      </View>
      <TextInput
        style={loginFormStyles.email}
        mode="flat"
        outlineColor={'transparent'}
        placeholder="3003543968"
        placeholderTextColor={lightTheme.colors.outlineVariant}
        underlineStyle={{
          backgroundColor: 'transparent',
        }}
        onFocus={() => setFocusPhone(true)}
        onBlur={() => setFocusPhone(false)}
        dense={true}
        // right={
        //   <TextInput.Icon
        //     icon={() => <CustomIcon name={'camera'} size={20} />}
        //   />
        // }
        label="Phone"
        value={phone}
        onChangeText={text => handlePhoneNumber(text)}
      />
    </View>
  );
};

export default InputForm;
