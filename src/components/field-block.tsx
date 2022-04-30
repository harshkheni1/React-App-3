import React from 'react';
import { Box, List, Text } from '@/ui-kit';

const FieldBlock: React.FC<{
  name?: string;
  value?: string | number;
  valueArr?: string[];
  prefix?: string;
  uppercase?: boolean;
}> = ({ name, value, valueArr, prefix, uppercase = false }) => {
  return value ? (
    <Box>
      <Text measure="sm" fontWeight="sbold" m={[0, 0, 10]}>
        {name}:
      </Text>
      {valueArr ? (
        <List listStyle="check" color="gray800" measure="sm" mb={10}>
          {valueArr.map((item) => (
            <List.Item key={item} mb={10}>
              {item}
            </List.Item>
          ))}
        </List>
      ) : (
        <Text breakAll measure="sm" m={[0, 0, 10]} uppercase={uppercase}>
          {prefix}
          {value}
        </Text>
      )}
    </Box>
  ) : null;
};

export default FieldBlock;
