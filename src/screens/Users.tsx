import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {debounce} from 'lodash';

const Users = ({navigation}) => {
  const [query, setQuery] = useState('tom');
  const [users, setUsers] = useState([]);
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
      } = users;

      setUsers(items);
      setTotalCount(total_count);
    }, 1000),
    [setUsers, setTotalCount, setLoading],
  );

  useEffect(() => {
    getUsers(query);
  }, [query, getUsers]);

  return (
    <SafeAreaView>
      <View>
        <View>
          <TextInput
            editable
            maxLength={40}
            onChangeText={setQuery}
            value={query}
          />
        </View>
        {query ? (
          <View>
            {loading && <ActivityIndicator size="small" color="#000000" />}
            <Text>{totalCount} Users</Text>
            {users.map(user => (
              <Text
                key={user.id}
                onPress={() =>
                  navigation.navigate('UserDetails', {name: user.login, user})
                }>
                {user.login}
              </Text>
            ))}
          </View>
        ) : (
          <Text>Start typing</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Users;
