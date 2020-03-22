import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {searchUsers} from '../state/userList/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as UserListSelector} from '../state/userList';

import {debounce} from 'lodash';
import {
  Layout,
  Text,
  Divider,
  TopNavigation,
  Input,
  List,
  ListItem,
  Icon,
  Avatar,
} from '@ui-kitten/components';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const Users = ({navigation}) => {
  const [query, setQuery] = useState('');
  const {users, totalCount, next, refreshing, error} = useSelector(
    UserListSelector,
  );

  const asyncSearchUsers = useActions(searchUsers);

  const getUsersDecounced = useCallback(
    debounce(async userQuery => {
      asyncSearchUsers({query: userQuery});
    }, 500),
    [asyncSearchUsers],
  );

  useEffect(() => {
    if (query && query.length > 2) {
      getUsersDecounced(query);
    } else {
      getUsersDecounced.cancel();
    }
  }, [query, getUsersDecounced]);

  const renderItemAccessory = style => (
    <Icon
      width={32}
      height={32}
      fill="blue"
      name="arrow-ios-forward-outline"
      {...style}
    />
  );
  const renderItemIcon = ({tintColor, ...style}, item) => (
    <Avatar {...style} source={{uri: item.avatar_url}} />
  );

  const renderItem = ({item, index}) => (
    <ListItem
      icon={style => renderItemIcon(style, item)}
      onPress={() =>
        navigation.navigate('UserDetails', {name: item.login, user: item})
      }
      accessory={renderItemAccessory}>
      <Avatar size="medium" source={{uri: item.avatar_url}} />
      <Text style={styles.itemName}>{item.login}</Text>
    </ListItem>
  );
  const renderSearchIcon = style => <Icon {...style} name="search-outline" />;

  const onListEndReached = useCallback(() => {
    if (next) {
      asyncSearchUsers({query, page: next.page});
    }
  }, [next, query, asyncSearchUsers]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Users" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Input
          editable
          maxLength={40}
          autoCapitalize="none"
          onChangeText={setQuery}
          value={query}
          icon={renderSearchIcon}
          placeholder="Search for users"
        />
        <Error error={error} />
        {totalCount > 0 && (
          <Text style={styles.totalCount} status="info">
            {totalCount} Users found
          </Text>
        )}
        <List
          style={styles.list}
          data={users}
          renderItem={renderItem}
          refreshing={refreshing}
          onEndReached={onListEndReached}
          onEndReachedThreshold={0.8}
        />
        <LoadingIndicator visible={refreshing} />
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
  totalCount: {
    // textAlign: 'center',
    marginLeft: 20,
  },
  list: {
    backgroundColor: 'white',
  },
  itemName: {
    marginLeft: 20,
  },
  loadMoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Users;
