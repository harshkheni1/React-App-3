import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { TagStyled } from './tag.styled';
import { TagProps } from './types';

export const Tag: FC<TagProps> & WithStyle = (props) => {
  const { color, measure, uppercase, fontWeight, children, nowrap, position } = props;
  return <TagStyled {...{ color, measure, uppercase, fontWeight, nowrap, position }}>{children}</TagStyled>;
};

Tag.defaultProps = {
  color: 'review',
  measure: 'md',
  uppercase: false,
  fontWeight: 'sbold',
};

Tag.displayName = 'Tag';
Tag.Style = TagStyled;
