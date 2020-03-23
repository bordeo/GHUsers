import {Linking} from 'react-native';

const openUrl = (url: string) => {
  Linking.openURL(url).catch(err => console.error('An error occurred', err));
};

export default openUrl;
