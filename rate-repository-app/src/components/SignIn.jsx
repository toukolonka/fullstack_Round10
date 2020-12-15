import React from 'react';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 40,
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
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

// eslint-disable-next-line no-unused-vars
const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    console.log(username);
    console.log(password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;