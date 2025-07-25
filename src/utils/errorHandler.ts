import Toast from 'react-native-toast-message';

export function showErrorToast(message: string) {
  Toast.show({
    type: 'error',
    text1: 'Erro',
    text2: message,
    position: 'bottom',
    visibilityTime: 4000,
  });
}