import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginFormAction, LoginFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {Fragment, useContext, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import Buttons from './Buttons';
import ErrorInputForm from './ErrorInputForm';
import InputForm from './InputForm';
import {ThemeContext} from '@src/types/contextTypes';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  setIsLogin,
}: LoginFormProps) => {
  const phoneRef = useRef<any>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

  return (
    <Fragment>
      <Text
        variant="titleLarge"
        style={{
          color: theme.dark
            ? colors.primaryContainer
            : colors.onPrimaryContainer,
        }}>
        {t('loginTitle')}
      </Text>
      <InputForm
        phoneRef={phoneRef}
        setButtonAction={setCurrentButtonAction}
        type="phone"
      />
      {errorPhone && <ErrorInputForm />}
      <Buttons
        setButtonAction={setButtonAction}
        currentButtonAction={currentButtonAction}
        setIsLogin={setIsLogin}
      />
    </Fragment>
  );
};

export default LoginForm;
