import React, {useEffect} from 'react';
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
} from '@ui-kitten/components';

const Repositories = ({route, navigation}) => {
  const {user} = route.params;
  console.log(user);
  const {userRepos, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserRepos = useActions(getUserRepos);

  useEffect(() => {
    asyncGetUserRepos(user.login);
  }, [user, asyncGetUserRepos]);

  const renderItem = ({item, index}) => <ListItem title={item.full_name} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Text>Profile</Text>
        {error && <Text>{error.message}</Text>}
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default Repositories;
