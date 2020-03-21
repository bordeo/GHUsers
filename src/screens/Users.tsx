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
  Spinner,
  List,
  ListItem,
  Button,
  Icon,
  Avatar,
  Modal,
} from '@ui-kitten/components';

const Users = ({navigation}) => {
  const [query, setQuery] = useState('');
  const {users, totalCount, next, refreshing, error} = useSelector(
    UserListSelector,
  );

  const asyncSearchUsers = useActions(searchUsers);

  const getUsersDecounced = useCallback(
    debounce(async userQuery => {
      asyncSearchUsers(userQuery);
    }, 500),
    [asyncSearchUsers],
  );
  useEffect(() => {
    if (query) {
      getUsersDecounced(query);
      // asyncSearchUsers(query);
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
      title={item.login}
      icon={style => renderItemIcon(style, item)}
      onPress={() =>
        navigation.navigate('UserDetails', {name: item.login, user: item})
      }
      accessory={renderItemAccessory}
    />
  );
  const renderSearchIcon = style => <Icon {...style} name="search-outline" />;
  const renderListFooterComponent = () => (
    <>
      <Modal backdropStyle={styles.backdrop} visible={refreshing}>
        <Layout style={styles.modalContainer}>
          <Spinner />
        </Layout>
      </Modal>
      {!!next && (
        <Layout style={styles.loadMoreContainer}>
          <Button size="small">Load More</Button>
        </Layout>
      )}
    </>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Users" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Input
          disabled={refreshing}
          editable
          maxLength={40}
          onChangeText={setQuery}
          value={query}
          icon={renderSearchIcon}
          placeholder="Search for users"
        />
        {error && <Text>{error.message}</Text>}
        {totalCount > 0 && <Text>{totalCount} Users</Text>}
        <List
          data={users}
          renderItem={renderItem}
          refreshing={refreshing}
          ListFooterComponent={renderListFooterComponent}
        />
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadMoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Users;
