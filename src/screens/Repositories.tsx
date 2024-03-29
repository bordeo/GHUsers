import React, {FunctionComponent, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserRepos} from '../state/users/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/users';
import {
  Layout,
  List,
  ListItem,
  Text,
  Icon,
  Select,
  SelectOptionType,
} from '@ui-kitten/components';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import {UserDetailsScreenProps} from '../types';
import openUrl from '../utils/openUrl';
import {Repo} from '../state/types';

interface SelectOption extends SelectOptionType {
  value?: string;
}

const sortOptions: SelectOption[] = [
  {value: 'full_name', text: 'Name'},
  {value: 'created', text: 'Creation Date'},
  {value: 'updated', text: 'Update Date'},
  {value: 'pushed', text: 'Push Date'},
];

const Repositories: FunctionComponent<UserDetailsScreenProps> = ({route}) => {
  const {user} = route.params;
  const [sort, setSort] = useState(sortOptions[0]);
  const [direction, setDirection]: ['asc' | 'desc', any] = useState('asc');
  const {userRepos, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserRepos = useActions(getUserRepos);

  useEffect(() => {
    asyncGetUserRepos({username: user.login});
  }, [user, asyncGetUserRepos]);

  const renderItem = ({item}: {item: Repo}) => (
    <ListItem
      title={item.full_name}
      onPress={() => {
        openUrl(item.html_url);
      }}>
      <Layout style={styles.item}>
        <Text>{item.name}</Text>
        <Layout style={styles.stars}>
          {item.stargazers_count > 0 ? (
            <>
              <Text category="s1">{item.stargazers_count.toString()}</Text>
              <Icon name="star" width={20} height={20} fill="#3366FF" />
            </>
          ) : (
            <Icon name="star-outline" width={20} height={20} fill="#3366FF" />
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

  const onChangeSort = (option: SelectOption) => {
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
