import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserRepos} from '../state/userList/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/userList';
import {
  Layout,
  List,
  ListItem,
  Text,
  Icon,
  Select,
} from '@ui-kitten/components';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const sortOptions = [
  {value: 'full_name', text: 'Name'},
  {value: 'created', text: 'Creation Date'},
  {value: 'updated', text: 'Update Date'},
  {value: 'pushed', text: 'Push Date'},
];

const Repositories = ({route, navigation}) => {
  const {user} = route.params;
  const [sort, setSort] = useState(sortOptions[0]);
  const [direction, setDirection]: ['asc' | 'desc', any] = useState('asc');
  const {userRepos, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserRepos = useActions(getUserRepos);

  useEffect(() => {
    asyncGetUserRepos({username: user.login});
  }, [user, asyncGetUserRepos]);

  const openRepoUrl = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const renderItem = ({item, index}) => (
    <ListItem
      title={item.full_name}
      onPress={() => {
        openRepoUrl(item.html_url);
      }}>
      <Layout style={styles.item}>
        <Text>{item.name}</Text>
        <Layout style={styles.stars}>
          {item.stargazers_count > 0 && (
            <>
              <Text style={styles.stargazersCount} category="s1">
                {item.stargazers_count}
              </Text>
              <Icon name="star" width={20} height={20} fill="#3366FF" />
            </>
          )}
        </Layout>
      </Layout>
    </ListItem>
  );

  const onDirectionPress = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    setDirection(newDirection);
    asyncGetUserRepos({
      username: user.login,
      sort: sort.value,
      direction: newDirection,
    });
  };

  const onChangeSort = option => {
    setSort(option);
    asyncGetUserRepos({
      username: user.login,
      sort: option.text,
      direction,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Text category="h6">Repositories</Text>
        <Error error={error} />

        <Layout style={styles.filters}>
          <Text style={styles.sortLabel} category="label">
            SORT BY
          </Text>
          <Select
            data={sortOptions}
            selectedOption={sort}
            onSelect={onChangeSort}
            style={styles.sort}
          />
          <Icon
            name={
              direction === 'asc'
                ? 'arrow-downward-outline'
                : 'arrow-upward-outline'
            }
            width={30}
            height={30}
            fill="#3366FF"
            onPress={onDirectionPress}
          />
        </Layout>
        <List
          style={styles.list}
          data={userRepos}
          renderItem={renderItem}
          refreshing={refreshing}
        />
        <LoadingIndicator visible={refreshing} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,

    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  stars: {flexDirection: 'row', alignItems: 'center'},
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  sort: {
    flex: 1,
  },
  list: {
    backgroundColor: 'white',
  },
  sortLabel: {
    marginRight: 10,
  },
});

export default Repositories;
