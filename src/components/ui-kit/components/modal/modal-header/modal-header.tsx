import React, { FC, useContext } from 'react';
import { isValidStringOrNumber, WithStyle } from '../../../utils';
import { Text } from '../../text';
import { Icon } from '../../icon';
import CloseModalContext from '../close-modal-context';
import { CloseButton, ModalHeaderStyled } from './modal-header.styled';

export const ModalHeader: FC & WithStyle = (props) => {
  const contextProps = useContext(CloseModalContext);
  return (
    <ModalHeaderStyled {...contextProps}>
      {React.Children.map(props.children, (c) => {
        return isValidStringOrNumber(c) ? <Text fontWeight="bold">{c}</Text> : c;
      })}
      <CloseButton variant="flat" data-testid="modal-close-button" onClick={contextProps.onClose}>
        <Icon name="close" measure={16} color="gray800" />
      </CloseButton>
    </ModalHeaderStyled>
  );
};

export default ModalHeader;
