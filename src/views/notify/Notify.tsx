import CustomBanner from '@src/components/customBanner/CustomBanner';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {t} from 'i18next';
import {SafeAreaView, View} from 'react-native';
import NotifyNotFound from './components/NotifyNotFound';
import {notifyStyles} from './styles/notifyStyles';
import {notifyHook} from './hooks/notifyHook';
import {ScrollView} from 'react-native-gesture-handler';

export const Notify = () => {
  const {panics, setModalVisible, modalVisible} = notifyHook();

  return (
    <SafeAreaView style={backgroundStyle}>
      <CustomBanner
        visible={true}
        text={t('buttonsView.banner')}
        icon="security"
      />
      <ScrollView contentContainerStyle={notifyStyles.container}>
        {panics.length > 0 ? (
          panics.map((value, index) => (
            <SimpleRemoveItemCards
              title={value.title}
              index={index}
              subtitle={value.body}
              key={index}
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              touchable
            />
          ))
        ) : (
          <NotifyNotFound />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notify;
