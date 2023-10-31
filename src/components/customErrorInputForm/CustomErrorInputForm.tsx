import {Text, View} from 'react-native';
import {loginFormStyles} from '../../views/login/styles/loginFormStyles';
import {actualTheme} from '@src/types/contextTypes';

const ErrorInputForm = ({
  error,
  marginTop = -29
}: {
  error: string;
  marginTop?: number;
}) => {
  const {dark, colors} = actualTheme();
  return (
    <View style={[loginFormStyles.errorContainer, {marginTop}]}>
      <Text
        style={[
          loginFormStyles.error,
          {color: dark ? colors.onSurface : colors.error}
        ]}>
        {error!}
      </Text>
    </View>
  );
};

export default ErrorInputForm;
