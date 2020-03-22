import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Layout, Spinner} from '@ui-kitten/components';

const LoadingIndicator = ({visible}) => {
  return (
    <Modal backdropStyle={styles.backdrop} visible={visible}>
      <Layout style={styles.modalContainer}>
        <Spinner />
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
});

export default LoadingIndicator;
