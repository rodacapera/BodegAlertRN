import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginFormAction, LoginFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {Fragment, useContext, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import Buttons from './Buttons';
import ErrorInputForm from '../../../components/customErrorInputForm/CustomErrorInputForm';
import CustomInputForm from '../../../components/customInputForm/CustomInputForm';
import {ThemeContext, actualTheme} from '@src/types/contextTypes';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  setIsLogin
}: LoginFormProps) => {
  const phoneRef = useRef<any>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
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
        setIsLogin={setIsLogin}
      />
    </Fragment>
  );
};

export default LoginForm;
