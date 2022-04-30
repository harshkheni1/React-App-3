import React, { FC } from 'react';
import { FormSelectFieldProps } from './types';
import { FormSelect } from './select';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { Tooltip } from '../../tooltip';
import { Row } from '../../grid';
import { FormSelectContainerStyled } from './select.styled';

export const FormSelectField: FC<FormSelectFieldProps> = ({ m, mt, mr, mb, ml, p, pt, pr, pb, pl, ...props }) => {
  return (
    <FormSelectContainerStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {props.label && props.tooltip ? (
        <Row>
          <FormLabel ml={15} mr={10} required={props.required}>
            {props.label}
          </FormLabel>
          <Tooltip isButton={true} direction="up" content={props.tooltip} />
        </Row>
      ) : (
        <FormLabel required={props.required}>{props.label}</FormLabel>
      )}
      <FormSelect {...props} hideError={true} />
      <FormError name={props.name} />
    </FormSelectContainerStyled>
  );
};
