import React, {FunctionComponent} from 'react';
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
  let message = '';
  if (error) {
    const errorConverted = errorMapping.find(
      (errorMap: {original: string; message: string}) =>
        errorMap.original === error.message,
    );
    message = errorConverted ? errorConverted.message : error.message;
  }

  return message ? <Text style={styles.message}>{message}</Text> : null;
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
});

export default Error;
