import { Alert, Platform } from 'react-native';

// React Native's Alert has no browser implementation. These dialogs are used
// for information and confirmations with one action plus an optional cancel.
const appAlert: typeof Alert.alert = (title, message, buttons, options) => {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons, options);
    return;
  }

  const text = [title, message].filter(Boolean).join('\n\n');
  const action = buttons?.find((button) => button.style !== 'cancel');
  const cancel = buttons?.find((button) => button.style === 'cancel');

  if (cancel) {
    if (window.confirm(text)) {
      action?.onPress?.();
    } else {
      cancel.onPress?.();
    }
  } else {
    window.alert(text);
    action?.onPress?.();
  }
};

export default appAlert;
