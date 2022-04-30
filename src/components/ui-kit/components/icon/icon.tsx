import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { IconComponents } from './const';
import { IconStyled } from './icon.styled';
import { IconProps } from './types';

export const Icon: FC<IconProps> & WithStyle = ({ color, measure, ...rest }) => {
  const content = IconComponents.find((svg) => svg.id === rest.name);
  const Content = content ? content.icon : null;

  return (
    <IconStyled $color={color} $measure={measure} {...rest}>
      <Content {...rest} />
    </IconStyled>
  );
};

Icon.defaultProps = {
  // color: 'gray800',
};

Icon.Style = IconStyled;
Icon.displayName = 'Icon';
