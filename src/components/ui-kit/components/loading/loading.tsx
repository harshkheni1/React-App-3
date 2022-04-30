import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { LoadingProps } from './types';
import { LoadingStyled, SpinnerStyled } from './loading.styled';

export const Loading: FC<LoadingProps> & WithStyle = ({ text, color, fontSize, ...rest }) => {
  return (
    <LoadingStyled $color={color} $fontSize={fontSize} {...rest}>
      <div>
        <SpinnerStyled $color={color} />
        {text && <span>{text}</span>}
      </div>
    </LoadingStyled>
  );
};

Loading.defaultProps = {
  color: 'gray800',
  fontSize: 32,
  full: true,
  bg: 'secondaryLight',
};
