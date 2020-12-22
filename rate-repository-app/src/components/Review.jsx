import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .positive('Rating has to be positive')
    .integer('Rating has to be integer between 0 and 100')
    .max(100),
    text: yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        name="ownerName"
        placeholder="Repository owner name"
        testID="repositoryOwnerField"
        autoCapitalize = 'none'
      />
      <FormikTextInput
        style={styles.input}
        name="repositoryName"
        placeholder="Repository name"
        testID="repositoryField"
        autoCapitalize = 'none'
      />
      <FormikTextInput
        style={styles.input}
        name="rating"
        placeholder="Rating between 0 and 100"
        testID="ratingField"
        keyboardType='numeric'
      />
      <FormikTextInput
        style={{ ...styles.input, height: 150 }}
        name="text"
        placeholder="Review"
        testID="reviewField"
        multiline={true}
      />
      <TouchableOpacity
        testID="submitButton"
        style={styles.submitButton}
        onPress={onSubmit}
      >
        <Text style={styles.submitButtonText}>Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// eslint-disable-next-line no-unused-vars
const Review = () => {
  const [rev] = useReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const id = await rev({ ownerName, repositoryName, rating, text });
      if (id) history.push(`/${id}`);
      else {
        Alert.alert(
          'Error',
          'This error might occur because the repository does not exist or you have already reviewed this repository',
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
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
