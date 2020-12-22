import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Text from './Text';
import * as WebBrowser from 'expo-web-browser';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingTop: 15,
    paddingLeft: 15,
    flexWrap: 'nowrap',
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    paddingTop: 5,
    flexShrink: 1,
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
          <Text testID="name" fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            testID="description"
            color="textSecondary"
            style={{ flexShrink: 1 }}
          >
            {item.description}
          </Text>
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

const CardBody = ({ language }) => {
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
        <Text testID="language" style={cardBodyStyles.text}>
          {language}
        </Text>
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
      <Text color="textSecondary">{children}</Text>
    </TouchableWithoutFeedback>
  );
};

const CardFooter = ({ item }) => {
  return (
    <View style={cardFooterStyles.container}>
      <View>
        <Text testID="stars" style={{ alignSelf: 'center' }}>
          {item.stargazersCount > 10000
            ? String(Math.round(item.stargazersCount / 100) / 10).concat('k')
            : item.stargazersCount}
        </Text>
        <CardFooterAction style={{ alignSelf: 'center' }}>
          Stars
        </CardFooterAction>
      </View>
      <View>
        <Text testID="forks" style={{ alignSelf: 'center' }}>
          {item.forksCount > 10000
            ? String(Math.round(item.forksCount / 100) / 10).concat('k')
            : item.forksCount}
        </Text>
        <CardFooterAction style={{ alignSelf: 'center' }}>
          Forks
        </CardFooterAction>
      </View>
      <View>
        <Text testID="reviews" style={{ alignSelf: 'center' }}>
          {item.reviewCount}
        </Text>
        <CardFooterAction style={{ alignSelf: 'center' }}>
          Reviews
        </CardFooterAction>
      </View>
      <View>
        <Text testID="rating" style={{ alignSelf: 'center' }}>
          {item.ratingAverage}
        </Text>
        <CardFooterAction style={{ alignSelf: 'center' }}>
          Rating
        </CardFooterAction>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
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
});

const GitHubButton = ({ url }) => {
  const handleSubmit = () => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <TouchableOpacity
      testID="gitHubButton"
      style={styles.button}
      onPress={handleSubmit}
    >
      <Text style={styles.buttonText}>Open in GitHub</Text>
    </TouchableOpacity>
  );
};

const RepositoryItem = ({ item, show }) => {
  return (
    <View style={styles.container}>
      <CardHeader item={item} />
      <CardBody language={item.language} />
      <CardFooter item={item} />
      {show ? <GitHubButton url={item.url} /> : null}
    </View>
  );
};

export default RepositoryItem;
