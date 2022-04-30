import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { ProgressProps } from './types';
import { ProgressStyled } from './progress.styled';
import { SpacingProps } from '../../const';

export const Progress: FC<ProgressProps & SpacingProps> & WithStyle = ({ color, ...rest }) => {
  return (
    <ProgressStyled $color={color} {...rest}>
      <div />
    </ProgressStyled>
  );
};

Progress.defaultProps = {
  color: 'primary',
  bg: 'secondary',
  percentage: 0,
};

Progress.displayName = 'Progress';
Progress.Style = ProgressStyled;
