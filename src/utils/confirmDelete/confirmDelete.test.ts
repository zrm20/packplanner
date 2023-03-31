import { Alert } from 'react-native';

import confirmDelete from './confirmDelete';

describe('confirmDelete()', () => {
  it('should call deleteFn when the user confirms the delete action', () => {
    const deleteFn = jest.fn();
    Alert.alert = jest.fn().mockImplementationOnce((title, message, buttons) => {
      // Call the onPress function of the second button (destructive)
      buttons[1].onPress();
    });

    confirmDelete(deleteFn);

    expect(deleteFn).toHaveBeenCalled();
  });

  it('should not call deleteFn when the user cancels the delete action', () => {
    const deleteFn = jest.fn();
    Alert.alert = jest.fn().mockImplementationOnce((title, message, buttons) => {
      // Call the onPress function of the first button (cancel)
      buttons[0].onPress();
    });

    confirmDelete(deleteFn);
    expect(deleteFn).not.toHaveBeenCalled();
  });

  it('should call the callback function after the deleteFn is called', async () => {
    const deleteFn = jest.fn();
    const callback = jest.fn();
    Alert.alert = jest.fn().mockImplementationOnce((title, message, buttons) => {
      buttons[1].onPress();
    });

    await confirmDelete(deleteFn, 'Do you want to delete this?', callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
