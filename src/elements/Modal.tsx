import React, { PropsWithChildren, useEffect } from 'react';
import { BackHandler } from 'react-native';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';

const defaultProps = {};

type MyModalProps = {
  title: React.ReactNode | string;
  modalVisible: boolean;
  setModalVisible: (boolean: boolean) => void;
  footer?: React.ReactNode;
} & PropsWithChildren &
  typeof defaultProps;

const MyModal = ({
  title,
  children,
  modalVisible,
  footer,
  setModalVisible,
}: MyModalProps) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible(false);
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('modalVisible', modalVisible);

  return (
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

MyModal.defaultProps = defaultProps;

export default MyModal;
