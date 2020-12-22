import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 5,
  },
  text: {
    fontSize: theme.fontSizes.appBar,
    color: theme.colors.textAppBar,
    paddingHorizontal: 8,
  },
  link: {
    paddingVertical: 15,
  }
});

const AppBar = () => {
  const [user, setUser] = useState(null);

  const result = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      setUser(result.data.authorizedUser);
    }
  }, [result.data]);

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  let history = useHistory();

  const reset = async () => {
    history.push('/signin');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8} style={styles.link}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {user ? (
          <Link to="/review" component={TouchableOpacity} activeOpacity={0.8} style={styles.link}>
            <Text style={styles.text}>Create a Review</Text>
          </Link>
        ) : null}
        {user ? (
          <Link to="/reviews" component={TouchableOpacity} activeOpacity={0.8} style={styles.link}>
            <Text style={styles.text}>My Reviews</Text>
          </Link>
        ) : null}
        {user ? (
          <TouchableOpacity onPress={reset} style={styles.link}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8} style={styles.link}>
            <Text style={styles.text}>Sign In</Text>
          </Link>
        )}
        {user ? null : (
          <Link to="/signup" component={TouchableOpacity} activeOpacity={0.8} style={styles.link}>
            <Text style={styles.text}>Sign Up</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
