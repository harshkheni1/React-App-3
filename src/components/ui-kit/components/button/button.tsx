import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { ButtonProps } from './types';
import { ButtonStyled } from './button.styled';

export const Button: FC<ButtonProps> & WithStyle = React.memo(
  React.forwardRef(({ color, children, ...rest }, ref) => {
    return (
      <ButtonStyled $color={color} ref={ref} {...rest}>
        {children}
      </ButtonStyled>
    );
  }),
);

Button.defaultProps = {
  variant: 'solid',
  color: 'primary',
  type: 'button',
  measure: 'md',
  uppercase: true,
  borderRadius: 24.5,
};

Button.displayName = 'Button';
Button.Style = ButtonStyled;
