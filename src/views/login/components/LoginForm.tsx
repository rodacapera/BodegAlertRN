import {actualTheme} from '@src/types/contextTypes';
import {LoginFormProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {Fragment, useRef} from 'react';
import {Text} from 'react-native-paper';
import ErrorInputForm from '../../../components/customErrorInputForm/CustomErrorInputForm';
import CustomInputForm from '../../../components/customInputForm/CustomInputForm';
import Buttons from './Buttons';

const LoginForm = ({
  setButtonAction,
  errorPhone,
  currentButtonAction,
  setCurrentButtonAction,
  type,
  errorUserNotExist
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
      {errorUserNotExist && (
        <ErrorInputForm error={t('loginView.errorUserNotExist')} />
      )}
      <Buttons
        setButtonAction={setButtonAction}
        currentButtonAction={currentButtonAction}
        type={type}
      />
    </Fragment>
  );
};

export default LoginForm;
