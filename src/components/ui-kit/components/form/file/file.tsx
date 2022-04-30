import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { Colors } from '../../../const';
import { FormFileProps } from './types';
import { FormFileButtonStyled, FormFileStyled } from './file.styled';
import { InputGroup } from '../../input-group';
import { Button } from '../../button';
import { Box } from '../../box';

export const FormFile: FC<FormFileProps> & WithStyle = (props) => {
  return (
    <InputGroup as="label">
      <InputGroup.Block>
        <FormFileStyled type="file" {...props} />
      </InputGroup.Block>
      <InputGroup.Addon>
        <Box
          border={`1px solid ${props.disabled ? Colors.gray800 : Colors.primary}`}
          style={{ width: 'calc(100% - 1px)', height: '100%' }}
          m={[-2, -1, -2, 0]}
        >
          <FormFileButtonStyled as="div" color={props.buttonStyle} disabled={props.disabled} variant="flat">
            {props.buttonTitle}
          </FormFileButtonStyled>
        </Box>
      </InputGroup.Addon>
    </InputGroup>
  );
};

FormFile.defaultProps = {
  buttonStyle: 'primary',
  buttonTitle: 'browse file(s)',
};

FormFile.displayName = 'FormFile';
FormFile.Style = FormFileStyled;
