import { WithStyle } from '../../utils';
import React, { FC, useEffect, useCallback } from 'react';
import CloseModalContext from './close-modal-context';
import { ModalBackgroundStyled } from './modal.styled';
import { ModalFooter } from './modal-footer';
import { ModalBody } from './modal-body';
import { ModalHeader } from './modal-header';
import { ModalDialog } from './modal-dialog';
import { ModalStaticProps, ModalProps } from './types';

export const Modal: FC<ModalProps> & WithStyle & ModalStaticProps = ({ ...props }) => {
  const { isOpen, onClose, children, measure, afterOpenModal } = props;

  const handleEscPress = useCallback((e: any) => e.keyCode === 27 && onClose(), []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      afterOpenModal && afterOpenModal();
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  return (
    isOpen && (
      <ModalBackgroundStyled measure={measure} onClick={onClose} {...props}>
        <CloseModalContext.Provider value={props}>
          <ModalDialog {...{ measure }}>{children}</ModalDialog>
        </CloseModalContext.Provider>
      </ModalBackgroundStyled>
    )
  );
};

Modal.defaultProps = {
  isOpen: false,
  measure: 'md',
};

ModalDialog.displayName = 'Modal.Dialog';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';

Modal.Dialog = ModalDialog;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
