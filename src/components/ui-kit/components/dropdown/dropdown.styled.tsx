import React, { FC } from 'react';
import { styled } from '../../utils';
import { DropdownProps } from './types';

const DropdownChild: FC<DropdownProps> = (props) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};
export const DropdownStyled = styled(DropdownChild)<DropdownProps>`
  margin: 0;
  padding: 0;
`;
