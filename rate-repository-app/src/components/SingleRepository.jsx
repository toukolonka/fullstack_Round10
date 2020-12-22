import React from 'react';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import { format, parseISO } from 'date-fns';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';

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

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ paddingBottom: 10 }}>
      <RepositoryItem key={repository.id} item={repository} show={true} />
    </View>
  );
};

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
});

const ReviewItem = ({ review }) => {
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
              {review.user.username}
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
    </View>
  );
};

const SingleRepository = () => {
  let { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: 7
  });

  const theRepository = repository
    ? repository
    : [];
  
  const reviewNodes = repository
    ? theRepository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={theRepository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
