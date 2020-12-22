import React from 'react';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
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
      .required('Username is required')
      .min(1, 'Username must be at least 5 characters')
      .max(30, 'Username can be at most 30 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Must be at least 5 characters')
      .max(50, 'Must be at most 50 characters'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords do not match")
      .required('Password confirmation is required')
      .min(5, 'Must be at least 5 characters')
      .max(50, 'Must be at most 50 characters'),
  });

const initialValues = {
  username: '',
  password: '',
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        name="username"
        placeholder="Username"
        testID='usernameField'
        autoCapitalize = 'none'
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        testID='passwordField'
      />
      <FormikTextInput
        style={styles.input}
        name="password2"
        placeholder="Password confirmation"
        secureTextEntry={true}
        testID='passwordField'
      />
      <TouchableOpacity testID='submitButton' style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// eslint-disable-next-line no-unused-vars
const SignUp = () => {

  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      if (data) {
        const bool = await signIn({ username, password });
        if (bool) history.push("/");
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;
