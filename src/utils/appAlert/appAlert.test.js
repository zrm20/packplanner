import { Alert, Platform } from 'react-native';

import appAlert from './appAlert';

describe('app alerts', () => {
  const originalPlatform = Platform.OS;
  const originalConfirm = window.confirm;
  const originalAlert = window.alert;

  beforeEach(() => {
    Platform.OS = 'web';
    window.confirm = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    Platform.OS = originalPlatform;
    window.confirm = originalConfirm;
    window.alert = originalAlert;
    jest.restoreAllMocks();
  });

  it('runs a destructive action only after browser confirmation', () => {
    const remove = jest.fn();
    const cancel = jest.fn();
    const buttons = [
      { text: 'Cancel', style: 'cancel', onPress: cancel },
      { text: 'Remove', style: 'destructive', onPress: remove },
    ];

    window.confirm.mockReturnValue(false);
    appAlert('Remove item?', 'This cannot be undone.', buttons);
    expect(remove).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledTimes(1);

    window.confirm.mockReturnValue(true);
    appAlert('Remove item?', 'This cannot be undone.', buttons);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(window.confirm).toHaveBeenCalledWith('Remove item?\n\nThis cannot be undone.');
  });

  it('confirms guest logout when the action is before Cancel', () => {
    const logout = jest.fn();
    window.confirm.mockReturnValue(true);
    appAlert('Lose guest data?', 'Continue?', [
      { text: 'Log out', style: 'destructive', onPress: logout },
      { text: 'Cancel', style: 'cancel' },
    ]);
    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('displays informational messages in the browser', () => {
    appAlert('Information', 'Base weight excludes consumables.');
    expect(window.alert).toHaveBeenCalledWith('Information\n\nBase weight excludes consumables.');
    expect(window.confirm).not.toHaveBeenCalled();
  });

  it('keeps native alert buttons on iOS', () => {
    Platform.OS = 'ios';
    const nativeAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const buttons = [{ text: 'Cancel', style: 'cancel' }];
    appAlert('Title', 'Message', buttons);
    expect(nativeAlert).toHaveBeenCalledWith('Title', 'Message', buttons, undefined);
    expect(window.confirm).not.toHaveBeenCalled();
  });
});
