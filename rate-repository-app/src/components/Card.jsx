import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from './Text';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingTop: 15,
    paddingLeft: 15,
    flexWrap: 'nowrap',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    paddingTop: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image
          style={cardHeaderStyles.tinyLogo}
          source={{ uri: item.ownerAvatarUrl }}
        />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <View>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
        </View>
        <View>
          <Text color="textSecondary">{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 80,
  },
  text: {
    color: 'white',
  },
});

const CardBody = ({ content }) => {
  return (
    <View style={cardBodyStyles.container}>
      <View
        style={{
          alignSelf: 'flex-start',
          padding: 8,
          backgroundColor: 'blue',
          borderRadius: 10,
        }}
      >
        <Text style={cardBodyStyles.text}>{content}</Text>
      </View>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  actionTouchable: {
    flexGrow: 0,
  },
  actionText: {
    textDecorationLine: 'underline',
  },
});

const CardFooterAction = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback
      style={cardFooterStyles.actionTouchable}
      {...props}
    >
      <Text color="textSecondary">
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const CardFooter = ({ item }) => {
  return (
    <View style={cardFooterStyles.container}>
      <View>
        <Text style={{alignSelf: 'center'}}>{item.stargazersCount > 1000 ? String(Math.round(item.stargazersCount/100)/10).concat('k') : item.stargazersCount}</Text>
        <CardFooterAction style={{alignSelf: 'center'}}>Stars</CardFooterAction>
      </View>
      <View>
        <Text style={{alignSelf: 'center'}}>{item.forksCount > 1000 ? String(Math.round(item.forksCount/100)/10).concat('k') : item.forksCount}</Text>
        <CardFooterAction style={{alignSelf: 'center'}}>Forks</CardFooterAction>
      </View>
      <View>
        <Text style={{alignSelf: 'center'}}>{item.reviewCount}</Text>
        <CardFooterAction style={{alignSelf: 'center'}}>Reviews</CardFooterAction>
      </View>
      <View>
        <Text style={{alignSelf: 'center'}}>{item.ratingAverage}</Text>
        <CardFooterAction style={{alignSelf: 'center'}}>Rating</CardFooterAction>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const Card = ({ item }) => {
  return (
    <View style={styles.container}>
      <CardHeader item={item} />
      <CardBody content={item.language} />
      <CardFooter item={item} />
    </View>
  );
};


export default Card;