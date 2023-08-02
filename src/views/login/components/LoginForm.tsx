import React, {Fragment, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import {LoginFormAction} from '@src/types/loginTypes';
import ErrorInputForm from './ErrorInputForm';
import Buttons from './Buttons';
import InputForm from './InputForm';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {t} from 'i18next';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  setIsLogin,
}: {
  setButtonAction: (e: LoginFormAction) => void;
  errorPhone: boolean;
  setIsLogin: (e: boolean) => void;
}) => {
  const phoneRef = useRef<any>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  return (
    <Fragment>
      <Text variant="titleLarge">{t('loginTitle')}</Text>
      <InputForm phoneRef={phoneRef} setButtonAction={setCurrentButtonAction} />
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
