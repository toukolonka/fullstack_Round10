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
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 10,
  },
  text: {
    fontSize: theme.fontSizes.appBar,
    color: theme.colors.textAppBar,
    paddingLeft: 15,
  },
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
    console.log(result.data);
    await authStorage.removeAccessToken();
    console.log(authStorage.getAccessToken());
    await apolloClient.resetStore();
    console.log(result.data);
    history.push("/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {user ? (
          <TouchableOpacity onPress={reset}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.text}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
