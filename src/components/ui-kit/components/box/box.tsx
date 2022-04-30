import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { BoxStyled } from './box.styled';
import { BoxProps } from './types';

export const Box: FC<BoxProps> & WithStyle = React.memo(
  React.forwardRef(({ display, color, children, ...rest }, ref) => {
    return (
      <BoxStyled $display={display} $color={color} ref={ref} {...rest}>
        {children}
      </BoxStyled>
    );
  }),
);

Box.displayName = 'Box';
Box.Style = BoxStyled;
