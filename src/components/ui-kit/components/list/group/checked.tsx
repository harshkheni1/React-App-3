import React, { FC, Fragment, useContext } from 'react';
import { WithStyle } from '../../../utils';
import {
  ListGroupCheckedItemStyled,
  ListGroupCheckedStyled,
  ListGroupCheckedItemTitleStyled,
  ListGroupCheckedItemStatusStyled,
} from './checked.styled';
import { ListGroupCheckedProps, ListGroupCheckedItemProps, ListGroupCheckedStaticProps } from './types';
import { Icon } from '../../icon';
import { A } from '../../link';
import ListGroupCheckedContext from './checked-context';

export const ListGroupChecked: FC<ListGroupCheckedProps> & ListGroupCheckedStaticProps & WithStyle = (props) => {
  const { children, measure } = props;
  return (
    <ListGroupCheckedStyled {...props}>
      <ListGroupCheckedContext.Provider value={measure}>{children}</ListGroupCheckedContext.Provider>
    </ListGroupCheckedStyled>
  );
};

export const ListGroupCheckedItem: FC<ListGroupCheckedItemProps> & WithStyle = (props) => {
  const { active, url, title, status, onClick } = props;
  const measure = useContext(ListGroupCheckedContext);

  return (
    <ListGroupCheckedItemStyled {...{ active, measure, onClick }}>
      {active && <Icon name="check-thin" color="white" />}
      {url ? (
        <A href={url} target="_blank" rel="noreferrer noopener" underline={false}>
          {title && <ListGroupCheckedItemTitleStyled {...{ measure }}>{title}</ListGroupCheckedItemTitleStyled>}
          {status && <ListGroupCheckedItemStatusStyled>{status}</ListGroupCheckedItemStatusStyled>}
        </A>
      ) : (
        <Fragment>
          {title && <ListGroupCheckedItemTitleStyled {...{ measure }}>{title}</ListGroupCheckedItemTitleStyled>}
          {status && <ListGroupCheckedItemStatusStyled>{status}</ListGroupCheckedItemStatusStyled>}
        </Fragment>
      )}
    </ListGroupCheckedItemStyled>
  );
};

ListGroupChecked.defaultProps = {
  measure: 'md',
};

ListGroupCheckedItem.displayName = 'ListGroupChecked.Item';

ListGroupChecked.Item = ListGroupCheckedItem;
ListGroupChecked.Item.Style = ListGroupCheckedItemStyled;
