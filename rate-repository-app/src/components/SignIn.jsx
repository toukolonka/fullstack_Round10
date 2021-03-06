import React from 'react';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        name="username"
        placeholder="username"
        testID='usernameField'
        autoCapitalize = 'none'
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="password"
        secureTextEntry={true}
        testID='passwordField'
      />
      <TouchableOpacity testID='submitButton' style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// eslint-disable-next-line no-unused-vars
const SignIn = () => {

  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const bool = await signIn({ username, password });
      if (bool) history.push("/");
      else {
        Alert.alert(
          'Wrong credentials',
          'Your username or password is invalid',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      }
      
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;
