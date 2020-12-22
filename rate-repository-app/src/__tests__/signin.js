import React from 'react';
//import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  it('Sign in acts correctly', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

    await act(async () => {
        await fireEvent.changeText(getByTestId('usernameField'), 'kalle');
    });

    await act(async () => {
      await fireEvent.changeText(getByTestId('passwordField'), 'password');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('submitButton'));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    // onSubmit.mock.calls[0][0] contains the first argument of the first call

    
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
    
  });
});
