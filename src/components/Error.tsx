import React, {FunctionComponent, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';

const errorMapping = [
  {
    original: 'Request failed with status code 403',
    message: 'You reach the API rate limit',
  },
];

type Props = {error?: {message: string}};

const Error: FunctionComponent<Props> = ({error}) => {
  const message = useMemo(() => {
    if (error) {
      const errorConverted = errorMapping.find(
        (errorMap: {original: string; message: string}) =>
          errorMap.original === error.message,
      );
      return errorConverted ? errorConverted.message : error.message;
    } else {
      return null;
    }
  }, [error]);

  return (
    message && (
      <Text style={styles.message} status="error">
        {message}
      </Text>
    )
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
});

export default Error;
