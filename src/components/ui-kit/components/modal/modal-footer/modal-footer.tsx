import React, { FC, useContext } from 'react';
import { WithStyle } from '../../../utils';
import { FullWidthHelper, SpacingProps } from '../../../const';
import * as Styled from './modal-footer.styled';
import CloseModalContext from '../close-modal-context';

export const ModalFooter: FC & SpacingProps & FullWidthHelper & WithStyle = (props) => {
  const contextProps = useContext(CloseModalContext);
  return (
    <Styled.ModalFooterStyled {...contextProps} {...props}>
      {React.Children.map(props.children, (content) => content)}
    </Styled.ModalFooterStyled>
  );
};

export default ModalFooter;
