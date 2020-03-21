import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../state/userList/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/userList';
import {Layout, Spinner, Avatar, Modal, Text} from '@ui-kitten/components';

const Profile = ({route, navigation}) => {
  const {user} = route.params;
  console.log(user);
  const {userProfile, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserProfile = useActions(getUserProfile);

  useEffect(() => {
    asyncGetUserProfile(user.login);
  }, [user, asyncGetUserProfile]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Text>Profile</Text>
        {error && <Text>{error.message}</Text>}
        {!!userProfile && (
          <>
            <Avatar
              width={40}
              height={40}
              source={{uri: userProfile.avatar_url}}
            />
            <Text>{userProfile.name}</Text>
            <Text>{userProfile.email}</Text>
            <Text>{userProfile.html_url}</Text>
            <Text>{userProfile.location}</Text>
          </>
        )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Profile;
