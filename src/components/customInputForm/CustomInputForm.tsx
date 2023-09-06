import {lightTheme} from '@src/hooks/lightMode';
import {actualTheme} from '@src/types/contextTypes';
import {InputFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import {loginFormStyles} from '../../views/login/styles/loginFormStyles';

const CustomInputForm = ({type, phoneRef, setButtonAction}: InputFormProps) => {
  const [phone, setPhone] = useState('');
  const [focusPhone, setFocusPhone] = useState(false);
  const {colors} = actualTheme();

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
          borderBottomColor: focusPhone ? colors.error : colors.onSurface
        }
      ]}>
      <View style={loginFormStyles.phoneFlagContent}>
        {type === 'phone' ? (
          <PhoneInput
            ref={ref => {
              phoneRef.current = ref;
            }}
            textStyle={{color: colors.onSurface}}
            pickerBackgroundColor={colors.background}
            cancelTextStyle={{color: colors.onSecondaryContainer}}
            confirmTextStyle={{color: colors.onSecondaryContainer}}
            initialCountry={'co'}
          />
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
          backgroundColor: 'transparent'
        }}
        // theme={{
        //   colors: {
        //     primary: 'blue',
        //   },
        // }}
        onFocus={() => setFocusPhone(true)}
        onBlur={() => setFocusPhone(false)}
        dense={true}
        // right={
        //   <TextInput.Icon
        //     icon={() => <CustomIcon name={'camera'} size={20} />}
        //   />
        // }
        label={t('general.phone')}
        value={phone}
        onChangeText={text => handlePhoneNumber(text)}
      />
    </View>
  );
};

export default CustomInputForm;
