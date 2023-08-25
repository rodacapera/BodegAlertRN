import {ThemeContext} from '@src/types/contextTypes';
import {useContext} from 'react';
import {Text, View} from 'react-native';
import {loginFormStyles} from '../../views/login/styles/loginFormStyles';

const ErrorInputForm = ({error}: {error: string}) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <View style={loginFormStyles.errorContainer}>
      <Text style={[loginFormStyles.error, {color: colors.error}]}>
        {error!}
      </Text>
    </View>
  );
};

export default ErrorInputForm;
