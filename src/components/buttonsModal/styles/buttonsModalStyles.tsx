import {StyleSheet} from 'react-native';

export const buttonsModalStyles = StyleSheet.create({
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  linkText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalContainer: {padding: 20, flexDirection: 'row'},
  modalContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  helperCaption: {
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 3,
    borderRadius: 6,
  },
});
