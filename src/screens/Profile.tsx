import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../state/userList/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/userList';
import {Layout, Avatar, Text, Button, Icon, Card} from '@ui-kitten/components';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const NavigateIcon = style => {
  return (
    <Icon style={style} name="diagonal-arrow-right-up-outline" fill="#fff" />
  );
};

const Profile = ({route, navigation}) => {
  const {user} = route.params;
  console.log(user);
  const {userProfile, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserProfile = useActions(getUserProfile);

  useEffect(() => {
    asyncGetUserProfile({username: user.login});
  }, [user, asyncGetUserProfile]);

  const openProfileUrl = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Text category="h6">Profile</Text>
        <Error error={error} />
        {!!userProfile && (
          <Card style={styles.card}>
            <Layout style={styles.content}>
              <Layout style={styles.avatar}>
                <Avatar size="giant" source={{uri: userProfile.avatar_url}} />
              </Layout>
              <Layout style={styles.userData}>
                <Text category="s1">{userProfile.name}</Text>
                {!!userProfile.email && (
                  <Text category="s1">{userProfile.email}</Text>
                )}
                <Button
                  style={styles.button}
                  icon={NavigateIcon}
                  onPress={() => {
                    openProfileUrl(userProfile.html_url);
                  }}>
                  Profile page
                </Button>
                <Text category="s1">{userProfile.location}</Text>
              </Layout>
            </Layout>
          </Card>
        )}
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    flex: 0.3,
  },
  userData: {
    flex: 0.6,
  },
  button: {flexDirection: 'row-reverse'},
  card: {
    marginTop: 20,
  },
});

export default Profile;
