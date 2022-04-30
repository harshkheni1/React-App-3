import React, { FC } from 'react';
import { Col as BootCol, ColProps } from 'styled-bootstrap-grid';
import { WithStyle } from '../../utils';

export const Col: FC<ColProps> & WithStyle = (props) => {
  return <BootCol {...props}>{props.children}</BootCol>;
};

Col.displayName = 'Col';
