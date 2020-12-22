import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { Chevron } from 'react-native-shapes';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const dropDowntyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 14,
    paddingHorizontal: 12,
    paddingBottom: 14,
    backgroundColor: 'white',
    color: 'grey',
    paddingRight: 30,
    borderRadius: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={(value) => this.props.onSearchChange(value)}
            value={this.props.searchQuery}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <RNPickerSelect
            style={{
              ...dropDowntyles,
              iconContainer: { top: 20, right: 25 },
            }}
            onValueChange={(value) => this.props.onSorterChange(value)}
            items={[
              { label: 'Latest repositories', value: ['CREATED_AT', 'DESC'] },
              {
                label: 'Highest rated repositories',
                value: ['RATING_AVERAGE', 'DESC'],
              },
              {
                label: 'Lowest rated repositories',
                value: ['RATING_AVERAGE', 'ASC'],
              },
            ]}
            Icon={() => {
              return <Chevron size={2.0} color="gray" />;
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => this.props.handlePress(item.id)}
          >
            <RepositoryItem key={item.id} item={item} show={false} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sorter, setSorter] = useState(['CREATED_AT', 'DESC']);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: sorter[0],
    orderDirection: sorter[1],
    searchKeyword: debouncedSearch
  }
  );

  let history = useHistory();

  const handlePress = (id) => {
    history.push(`/${id}`);
  };

  const onSorterChange = (value) => {
    try {
      value[1];
      setSorter(value);
    } catch {
      setSorter(['CREATED_AT', 'DESC']);
    }
  };

  const onSearchChange = (query) => setSearchQuery(query);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      handlePress={handlePress}
      onSorterChange={onSorterChange}
      sorter={sorter}
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
