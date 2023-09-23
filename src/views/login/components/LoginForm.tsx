import {buttonActionInitialState} from '@src/globals/constants/login';
import {actualTheme} from '@src/types/contextTypes';
import {LoginFormAction, LoginFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {Fragment, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import ErrorInputForm from '../../../components/customErrorInputForm/CustomErrorInputForm';
import CustomInputForm from '../../../components/customInputForm/CustomInputForm';
import Buttons from './Buttons';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  currentButtonAction,
  setCurrentButtonAction
}: LoginFormProps) => {
  const phoneRef = useRef<any>();
  const {colors, theme} = actualTheme();

  return (
    <Fragment>
      <Text
        variant="titleLarge"
        style={{
          color: theme.dark ? colors.onSurface : colors.onPrimaryContainer
        }}>
        {t('loginView.title')}
      </Text>
      <CustomInputForm
        phoneRef={phoneRef}
        setButtonAction={setCurrentButtonAction}
        type="phone"
      />
      {errorPhone && <ErrorInputForm error={t('loginView.errorPhone')} />}
      <Buttons
        setButtonAction={setButtonAction}
        currentButtonAction={currentButtonAction}
      />
    </Fragment>
  );
};

export default LoginForm;
