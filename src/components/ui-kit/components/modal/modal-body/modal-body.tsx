import React, { FC, useContext } from 'react';
import { WithStyle } from '../../../utils';
import * as Styled from './modal-body.styled';
import CloseModalContext from '../close-modal-context';
import { SpacingProps, FullWidthHelper } from '../../../const';

export const ModalBody: FC & SpacingProps & FullWidthHelper & WithStyle = (props) => {
  const contextProps = useContext(CloseModalContext);
  return (
    <Styled.ModalBodyStyled {...contextProps} {...props}>
      {React.Children.map(props.children, (content) => content)}
    </Styled.ModalBodyStyled>
  );
};

export default ModalBody;
