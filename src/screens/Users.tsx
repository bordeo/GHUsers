import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import parse from 'parse-link-header';

import axios from 'axios';
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
  const [users, setUsers] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(
    debounce(async userQuery => {
      setLoading(true);
      const users = await axios.get(
        `https://api.github.com/search/users?q=${userQuery}`,
      );
      console.log(users);
      setLoading(false);
      const {
        data: {items, total_count},
        headers: {link},
      } = users;

      const {next} = parse(link);

      setNextUrl(next ? next.url : '');
      setUsers(items);
      setTotalCount(total_count);
    }, 500),
    [setUsers, setTotalCount, setLoading, setNextUrl],
  );

  useEffect(() => {
    if (query) {
      getUsers(query);
    }
  }, [query, getUsers]);

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
      <Modal backdropStyle={styles.backdrop} visible={loading}>
        <Layout style={styles.modalContainer}>
          <Spinner />
        </Layout>
      </Modal>
      {totalCount > 40 && (
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
          editable
          maxLength={40}
          onChangeText={text => {
            setNextUrl('');
            setQuery(text);
          }}
          value={query}
          icon={renderSearchIcon}
          placeholder="Search for users"
        />
        {totalCount > 0 && <Text>{totalCount} Users</Text>}
        <List
          data={users}
          renderItem={renderItem}
          refreshing={loading}
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
