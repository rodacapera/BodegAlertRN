import {actualTheme} from '@src/types/contextTypes';
import {CustomLoaderProps} from '@src/types/globalTypes';
import {Fragment} from 'react';
import {ActivityIndicator, Caption} from 'react-native-paper';

const CustomLoader = ({label, visible, size, dots}: CustomLoaderProps) => {
  const {colors} = actualTheme();
  return visible ? (
    <Fragment>
      <ActivityIndicator
        animating={true}
        color={colors.secondary}
        size={size ?? 'small'}
      />
      <Caption style={{color: colors.onSurface, fontWeight: 'bold'}}>
        {label}
        {dots ? '...' : ''}
      </Caption>
    </Fragment>
  ) : (
    <></>
  );
};

export default CustomLoader;
