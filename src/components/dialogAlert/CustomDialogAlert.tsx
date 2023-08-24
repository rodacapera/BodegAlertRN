import {t} from 'i18next';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Portal, Text, Button} from 'react-native-paper';

const CustomDialogAlert = ({
  visible,
  setVisible,
  cancelButton,
  actionSuccess,
}: {
  visible: boolean;
  setVisible: (e: boolean) => void;
  cancelButton?: boolean;
  actionSuccess?: (e: boolean) => void;
}) => {
  const handleSuccess = () => {
    actionSuccess && actionSuccess(true);
    setVisible(false);
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>
          {t('errorLocationPermissionsAlert')}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            {t('descriptionErrorLocationPermissionsAlert')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          {cancelButton && (
            <Button onPress={() => setVisible(false)}>{t('cancel')}</Button>
          )}
          <Button onPress={handleSuccess}>{t('ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default CustomDialogAlert;
