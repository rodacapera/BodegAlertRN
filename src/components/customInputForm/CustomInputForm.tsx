import {lightTheme} from '@src/hooks/lightMode';
import {actualTheme} from '@src/types/contextTypes';
import {InputFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import {loginFormStyles} from '../../views/login/styles/loginFormStyles';

const CustomInputForm = ({
  type,
  phoneRef,
  setButtonAction,
  value,
  code
}: InputFormProps) => {
  const [phone, setPhone] = useState<string>();
  const [focusPhone, setFocusPhone] = useState(false);
  const {colors} = actualTheme();

  const handlePhoneNumber = (text: string) => {
    let myPhone = phoneRef.current.getCountryCode();
    myPhone = `+${myPhone} ${text}`;
    setButtonAction({
      name: 'login',
      show: false,
      phone: myPhone,
      logged: true,
      confirmation: undefined
    });
    setPhone(text);
  };

  useEffect(() => {
    value && setPhone(value);
  }, [value]);

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
            pickerItemStyle={{color: colors.onSurface}}
            initialCountry={code ?? 'co'}
            disabled={value ? true : false}
            // initialValue="1"
          />
        ) : (
          <></>
        )}
      </View>

      <TextInput
        style={loginFormStyles.phone}
        mode="flat"
        outlineColor={'transparent'}
        placeholder="3003543968"
        placeholderTextColor={lightTheme.colors.outlineVariant}
        underlineStyle={{
          backgroundColor: 'transparent'
        }}
        textColor={colors.onSurface}
        theme={{
          colors: {
            primary: colors.error,
            onSurfaceVariant: colors.onSurface
          }
        }}
        onFocus={() => setFocusPhone(true)}
        onBlur={() => setFocusPhone(false)}
        dense={true}
        // right={
        //   <TextInput.Icon
        //     icon={() => <CustomIcon name={'camera'} size={20} />}
        //   />
        // }
        onSubmitEditing={Keyboard.dismiss}
        inputMode="numeric"
        label={t('general.phone')}
        value={phone}
        onChangeText={text => handlePhoneNumber(text)}
        editable={!value ? true : false}
      />
    </View>
  );
};

export default CustomInputForm;
