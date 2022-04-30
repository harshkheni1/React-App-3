import React, { FC } from 'react';
import { FieldError } from 'react-uforms';
import { ErrorProps } from './types';
import { styled, css } from '../../../utils';
import { Colors, TextSize, spacingStyle } from '../../../const';

const FormErrorChild: FC<ErrorProps> = ({ name, className }) => <FieldError {...{ name, className }} />;
export const FormErrorStyles = css`
  color: ${Colors.danger};
  font-size: ${TextSize.xs};
  font-weight: bold;
  padding-top: 10px;
  display: flex;
  line-height: 15px;
`;
export const FormErrorStyled = styled(FormErrorChild)<ErrorProps>`
  ${FormErrorStyles}
  ${(props) => spacingStyle(props)}
`;
