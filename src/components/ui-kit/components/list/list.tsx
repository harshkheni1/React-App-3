import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { ListProps, ListStaticProps, ListItemProps } from './types';
import { ListStyled, ListItemStyled } from './list.styled';

export const List: FC<ListProps> & ListStaticProps & WithStyle = (props) => {
  const { color, children, ...rest } = props;
  return (
    <ListStyled $color={color} {...rest}>
      {children}
    </ListStyled>
  );
};

export const ListItem: FC<ListItemProps> & WithStyle = ({ children, ...rest }) => {
  return <ListItemStyled {...rest}>{children}</ListItemStyled>;
};

List.defaultProps = {
  m: [0],
  p: [0],
  color: 'primaryDark',
  inline: false,
  measure: 'md',
  listStyle: 'disc',
};

ListItem.displayName = 'List.Item';

List.Item = ListItem;
List.Item.Style = ListItemStyled;
