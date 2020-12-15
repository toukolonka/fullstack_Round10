import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
