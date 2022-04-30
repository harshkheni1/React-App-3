import React, { FC } from 'react';
import { TableEmptyProps } from './types';
import { Box } from '../box';
import { Text } from '../text';
import { Img } from '../img';

export const TableEmpty: FC<TableEmptyProps> = (props) => {
  const { text, img } = props;
  return (
    <Box align="center" p={[150, 0]}>
      <Img src={img} />
      <Text as="p" fontWeight="light" align="center">
        {text}
      </Text>
    </Box>
  );
};
