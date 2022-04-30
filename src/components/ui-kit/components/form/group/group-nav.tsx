import React, { FC, useContext } from 'react';
import { WithStyle } from '../../../utils';
import { FormGroupNavStyled } from './group-nav.styled';
import { FormGroupNavStyledAttrProps } from './types';
import { ContextApi } from 'react-uforms';

export const FormGroupNav: FC<FormGroupNavStyledAttrProps> & WithStyle = ({ ignoreCompleted, ...rest }) => {
  const { getGroups } = useContext(ContextApi);
  return <FormGroupNavStyled $ignoreCompleted={ignoreCompleted} $stepsQty={getGroups().length} {...rest} />;
};

FormGroupNav.displayName = 'FormGroupNav';
FormGroupNav.Style = FormGroupNavStyled;
