import { Platform } from 'react-native';

import isAndroid from './isAndroid';

describe('isAndroid()', () => {
  const originalOS = Platform.OS;

  afterEach(() => {
    Platform.OS = originalOS;
  });

  it('should return true if platform OS is android', () => {
    Platform.OS = 'android';

    const result = isAndroid();

    expect(result).toBe(true);
  });

  it('should return false for any other value', () => {
    Platform.OS = 'ios';

    const result = isAndroid();

    expect(result).toBe(false);
  });
});
