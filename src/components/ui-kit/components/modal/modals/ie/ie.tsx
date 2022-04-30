import React, { FC } from 'react';
import { A, Box, Button, Col, Heading, Icon, Modal, Row, Text } from '../../../../index';
import { IeModalStyled } from './ie.styled';

type ModalProps = {
  onClose?: () => void;
};

export const IeModal: FC<ModalProps> = ({ onClose }) => {
  return (
    <IeModalStyled isOpen onClose={onClose} measure="lg">
      <Modal.Body>
        <Heading m={[30, 0]} as="h4" align="center">
          Please use a different internet browser
        </Heading>
        <Row alignItems="center">
          <Col col={9}>
            <Text>
              Unfortunately, our application does not currently support this internet browser. As a result, some aspects
              of the website may not work properly. For best user experience, please use{' '}
              <A color="primary" target="_blank" href="https://www.google.com/chrome/">
                Chrome
              </A>
              ,{' '}
              <A color="primary" target="_blank" href="https://support.apple.com/downloads/safari">
                Safari
              </A>{' '}
              or{' '}
              <A color="primary" target="_blank" href="https://www.mozilla.org/en-US/firefox/new">
                Firefox
              </A>
              .
            </Text>
          </Col>
          <Col col={3}>
            <Box align="left">
              <Icon name="foreign-link" measure={80} />
            </Box>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button as="a" target="_blank" href="https://www.google.com/chrome/" fullWidth>
          Use Chrome
        </Button>
      </Modal.Footer>
    </IeModalStyled>
  );
};

IeModal.displayName = 'IeModal';
