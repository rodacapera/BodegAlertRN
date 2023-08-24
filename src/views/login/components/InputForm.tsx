import {lightTheme} from '@src/hooks/lightMode';
import {InputFormProps} from '@src/types/loginTypes';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import {loginFormStyles} from '../styles/loginFormStyles';
import {ThemeContext} from '@src/types/contextTypes';

const InputForm = ({type, phoneRef, setButtonAction}: InputFormProps) => {
  const [phone, setPhone] = useState('');
  const [focusPhone, setFocusPhone] = useState(false);
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

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
        {
          borderBottomWidth: focusPhone ? 1.9 : 0.7,
          borderBottomColor: focusPhone ? colors.error : colors.onSurface,
        },
      ]}>
      <View style={loginFormStyles.phoneFlagContent}>
        {type === 'phone' ? (
          <PhoneInput
            ref={ref => {
              phoneRef.current = ref;
            }}
            textStyle={{color: colors.onPrimaryContainer}}
            initialCountry={'co'}></PhoneInput>
        ) : (
          <></>
        )}
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
        theme={theme}
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
