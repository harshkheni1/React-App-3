import React, { FC } from 'react';
import { Icon } from '../../../icon';
import { FormCheckboxElementProps } from '../types';
import { FormCheckboxColor, FormCheckboxSize } from '../const';
import { FormCheckboxIconStyled } from './icon.styled';

export const FormCheckboxIcon: FC<FormCheckboxElementProps> = (props) => {
  const { measure, color } = props;
  return (
    <FormCheckboxIconStyled {...{ measure, color }}>
      <Icon
        name="check"
        color={FormCheckboxColor[color].checkedColor}
        measure={FormCheckboxSize[measure].checkedIconSize}
      />
    </FormCheckboxIconStyled>
  );
};

FormCheckboxIcon.defaultProps = {
  required: false,
  color: 'white',
  measure: 'md',
};

FormCheckboxIcon.displayName = 'FormCheckboxIcon';
