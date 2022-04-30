import React, { FC } from 'react';
import { Container as BootContainer, ContainerProps } from 'styled-bootstrap-grid';
import { WithStyle } from '../../utils';

export const Container: FC<ContainerProps> & WithStyle = (props) => {
  return <BootContainer {...props}>{props.children}</BootContainer>;
};

Container.displayName = 'Container';
