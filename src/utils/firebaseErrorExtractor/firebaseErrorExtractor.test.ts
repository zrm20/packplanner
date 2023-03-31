import { AuthError } from 'firebase/auth';

import { authErrorExtractor } from './firebaseErrorExtractor';

describe('authErrorExtractor()', () => {
  const extraErrorFields = {
    customData: {
      appName: 'myApp',
    },
    name: 'Error name',
    message: 'ErrorMessage',
  };

  it('should extract the error message from the error code', () => {
    const error: AuthError = { code: 'auth/user-not-found', ...extraErrorFields };

    const errorMessage = authErrorExtractor(error);
    expect(errorMessage).toBe('User not found');
  });

  it('should handle error codes with no dash', () => {
    const error: AuthError = { code: 'auth/internal-error', ...extraErrorFields };
    const errorMessage = authErrorExtractor(error);
    expect(errorMessage).toBe('Internal error');
  });

  it('should handle unknown error codes not starting with "auth/"', () => {
    const error: AuthError = { code: 'unknown', ...extraErrorFields };
    const errorMessage = authErrorExtractor(error);
    expect(errorMessage).toBe('Something went wrong');
  });
});
