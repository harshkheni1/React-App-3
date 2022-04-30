import React, { FC } from 'react';
import { styled, css } from '../../../../utils';
import { TextSize } from '../../../../const';
import { FormCheckboxVariantVariantStyles, FormCheckboxSize } from '../const';
import { FormCheckboxBlockVariationType, FormCheckboxElementProps, FormCheckboxLabelProps } from '../types';

const FormCheckboxLabelBlockChild: FC<FormCheckboxElementProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
);

export const labelBlockVariant = (variant: FormCheckboxBlockVariationType, index: number) => css`
  background-color: ${FormCheckboxVariantVariantStyles[variant].bg[index]};
  color: ${FormCheckboxVariantVariantStyles[variant].color[index]};
  border: 1px solid ${FormCheckboxVariantVariantStyles[variant].border[index]};
  font-weight: ${FormCheckboxVariantVariantStyles[variant].fontWeight[index]};
`;

export const FormCheckboxLabelBlockStyled = styled(FormCheckboxLabelBlockChild)<
  FormCheckboxElementProps & FormCheckboxLabelProps
>`
  padding: 5px 15px;
  line-height: 24px;
  font-size: ${({ measure }) => (measure ? `${FormCheckboxSize[measure].block.fontSize}px` : TextSize.md)};
  display: block;
  cursor: pointer;
  ${({ variant }) => variant && labelBlockVariant(variant, 0)}
  &:hover {
    ${({ variant }) => variant && labelBlockVariant(variant, 1)}
  }
`;
