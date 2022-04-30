import React, { FC } from 'react';
import { Row as BootRow, RowProps } from 'styled-bootstrap-grid';
import { WithStyle } from '../../utils';

export const Row: FC<RowProps> & WithStyle = (props) => {
  return <BootRow {...props}>{props.children}</BootRow>;
};

Row.displayName = 'Row';
