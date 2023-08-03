import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginFormAction, LoginFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import React, {Fragment, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import Buttons from './Buttons';
import ErrorInputForm from './ErrorInputForm';
import InputForm from './InputForm';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  setIsLogin,
}: LoginFormProps) => {
  const phoneRef = useRef<any>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  return (
    <Fragment>
      <Text variant="titleLarge">{t('loginTitle')}</Text>
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
