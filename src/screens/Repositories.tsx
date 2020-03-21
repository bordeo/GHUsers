import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserRepos} from '../state/userList/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/userList';
import {
  Layout,
  Spinner,
  List,
  ListItem,
  Modal,
  Text,
  Icon,
  Select,
} from '@ui-kitten/components';

const sortOptions = [
  {text: 'full_name'},
  {text: 'created'},
  {text: 'updated'},
  {text: 'pushed'},
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

  const renderItem = ({item, index}) => (
    <ListItem title={item.full_name}>
      <Layout style={styles.item}>
        <Text>{item.full_name}</Text>
        <Layout style={styles.stars}>
          <Text style={styles.stargazersCount}>{item.stargazers_count}</Text>
          <Icon name="star" width={20} height={20} fill="#3366FF" />
        </Layout>
      </Layout>
    </ListItem>
  );

  const onDirectionPress = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    setDirection(newDirection);
    asyncGetUserRepos({
      username: user.login,
      sort: sort.text,
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
        <Text>Profile</Text>
        {error && <Text>{error.message}</Text>}
        <Layout style={styles.filters}>
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
          data={userRepos}
          renderItem={renderItem}
          refreshing={refreshing}
        />
        <Modal backdropStyle={styles.backdrop} visible={refreshing}>
          <Layout style={styles.modalContainer}>
            <Spinner />
          </Layout>
        </Modal>
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
  item: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  stars: {flexDirection: 'row'},
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sort: {
    flex: 1,
  },
  stargazersCount: {
    // width: 40,
    // textAlign: 'right',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Repositories;
