import React, {FunctionComponent} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Layout, Text} from '@ui-kitten/components';
import {selector as NetworkSelector} from '../state/network';
import {useSelector} from 'react-redux';

const OfflineIndicator: FunctionComponent = () => {
  const {isConnected} = useSelector(NetworkSelector);

  return (
    <Modal backdropStyle={styles.backdrop} visible={!isConnected}>
      <Layout style={styles.modalContainer}>
        <Text style={styles.text} category="h6" status="info">
          Please connect to the internet to continue using the app
        </Text>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    textAlign: 'center',
  },
});

export default OfflineIndicator;
