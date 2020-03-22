import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';

const errorMapping = [
  {
    original: 'Request failed with status code 403',
    message: 'You reach the API rate limit',
  },
];

const Error = ({error}) => {
  if (!error) {
    return null;
  }

  const message = useMemo(() => {
    const errorConverted = errorMapping.find(
      errorMap => errorMap.original === error.message,
    );
    return errorConverted ? errorConverted.message : error.message;
  }, [error]);

  return (
    <Text style={styles.message} status="error">
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
});

export default Error;
