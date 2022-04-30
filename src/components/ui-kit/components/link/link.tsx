import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { LinkProps } from './types';
import { AStyled } from './link.styled';

export const A: FC<LinkProps> & WithStyle = React.memo(
  React.forwardRef(({ href, ...props }, ref) => {
    return (
      <AStyled href={href} ref={ref} {...props}>
        {props.children}
      </AStyled>
    );
  }),
);

A.defaultProps = {
  underline: true,
};

A.displayName = ' A';
A.Style = AStyled;
