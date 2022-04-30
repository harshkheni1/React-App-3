import React, { FC } from 'react';
import { GridThemeProvider as BootGridThemeProvider, ThemeProps } from 'styled-bootstrap-grid';
import { WithStyle } from '../../utils';

export const GridThemeProvider: FC<ThemeProps> & WithStyle = (props) => {
  return <BootGridThemeProvider {...props}>{props.children}</BootGridThemeProvider>;
};

GridThemeProvider.displayName = 'GridThemeProvider';
