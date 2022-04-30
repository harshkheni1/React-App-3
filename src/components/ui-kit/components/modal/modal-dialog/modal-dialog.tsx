import { WithStyle } from '../../../utils';
import React, { FC } from 'react';
import * as Styled from './modal-dialog.styled';
import { ModalDialogProps } from './types';

export const ModalDialog: FC<ModalDialogProps> & WithStyle = (props) => {
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  return <Styled.Dialog onClick={stopPropagation} {...props} />;
};
