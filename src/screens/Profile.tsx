import React, {FunctionComponent, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../state/users/asyncActions';
import {useActions} from '../hooks/useActions';
import {selector as userListSelector} from '../state/users';
import {
  Layout,
  Avatar,
  Text,
  Button,
  Icon,
  Card,
  StyleType,
} from '@ui-kitten/components';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import {UserDetailsScreenProps} from '../types';
import openUrl from '../utils/openUrl';
import FastImage from 'react-native-fast-image';

const NavigateIcon = (style: StyleType) => {
  return (
    <Icon style={style} name="diagonal-arrow-right-up-outline" fill="#fff" />
  );
};

const Profile: FunctionComponent<UserDetailsScreenProps> = ({route}) => {
  const {user} = route.params;

  const {userProfile, refreshing, error} = useSelector(userListSelector);

  const asyncGetUserProfile = useActions(getUserProfile);

  useEffect(() => {
    asyncGetUserProfile({username: user.login});
  }, [user, asyncGetUserProfile]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Text category="h6">Profile</Text>
        <Error error={error} />
        {!!userProfile && (
          <Card style={styles.card}>
            <Layout style={styles.content}>
              <Layout style={styles.avatar}>
                <FastImage
                  style={styles.avatarImage}
                  source={{uri: userProfile.avatar_url}}
                />
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
                    openUrl(userProfile.html_url);
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
  avatarImage: {width: 70, height: 70, borderRadius: 70},
  userData: {
    flex: 0.6,
  },
  button: {flexDirection: 'row-reverse'},
  card: {
    marginTop: 20,
  },
});

export default Profile;
