import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Text from './Text';
import { AUTHORIZED_USER } from '../graphql/queries';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-native';
import useDelete from '../hooks/useDelete';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const reviewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingTop: 15,
    paddingLeft: 15,
    flexWrap: 'nowrap',
  },
  ratingContainer: {
    flexGrow: 0,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'blue',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexGrow: 1,
    paddingTop: 5,
    paddingLeft: 10,
    flexShrink: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  textContainer: {
    paddingVertical: 10,
    paddingLeft: 75,
    paddingRight: 5,
  },
  viewButton: {
    backgroundColor: 'blue',
    padding: 1,
    margin: 15,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    margin: 15,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    paddingRight: 10,
  },
});

const ReviewItem = ({ review, onDelete }) => {
  let history = useHistory();
  const id = review.repository.id;

  const onViewSubmit = () => {
    history.push(`/${id}`);
  };

  const createDeleteAlert = () =>
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => onDelete(review.id) },
      ],
      { cancelable: false }
    );

  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={reviewStyles.container}>
        <View style={reviewStyles.ratingContainer}>
          <Text style={{ color: 'blue', fontSize: 20 }}>{review.rating}</Text>
        </View>
        <View style={reviewStyles.infoContainer}>
          <View>
            <Text testID="username" fontWeight="bold" fontSize="subheading">
              {review.repository.fullName}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text testID="date" color="textSecondary" style={{ flexShrink: 1 }}>
              {date}
            </Text>
          </View>
        </View>
      </View>
      <View style={reviewStyles.textContainer}>
        <Text testID="text">{review.text}</Text>
      </View>

      <View style={reviewStyles.container}>
        <View style={reviewStyles.buttonContainer}>
          <TouchableOpacity
            testID="viewButton"
            style={reviewStyles.viewButton}
            onPress={onViewSubmit}
          >
            <Text style={reviewStyles.buttonText}>View Repository</Text>
          </TouchableOpacity>
        </View>
        <View style={reviewStyles.buttonContainer}>
          <TouchableOpacity
            testID="viewButton"
            style={reviewStyles.deleteButton}
            onPress={createDeleteAlert}
          >
            <Text style={reviewStyles.buttonText}>Delete Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });

  useEffect(() => {
    refetch();
  }, []);

  const [del] = useDelete();

  const onDelete = (id) => {
    del({ id });
    refetch();
  };

  const reviewNodes = data
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} onDelete={onDelete} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};
export default MyReviews;
