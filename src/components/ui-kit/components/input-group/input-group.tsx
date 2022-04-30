import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { InputGroupProps, InputGroupStaticProps, InputGroupElementProps } from './types';
import {
  InputGroupStyled,
  InputGroupAddonStyled,
  InputGroupTextStyled,
  InputGroupBlockStyled,
} from './input-group.styled';

export const InputGroup: FC<InputGroupProps> & InputGroupStaticProps & WithStyle = (props) => {
  const { m, mt, mr, mb, ml, p, pt, pr, pb, pl, as, children } = props;
  return <InputGroupStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, as }}>{children}</InputGroupStyled>;
};

export const InputGroupAddon: FC<InputGroupElementProps> & WithStyle = ({ children, bg, ...rest }) => {
  return (
    <InputGroupAddonStyled bg={bg} {...rest}>
      {children}
    </InputGroupAddonStyled>
  );
};

export const InputGroupText: FC<InputGroupElementProps> & WithStyle = ({ children, bg, ...rest }) => {
  return (
    <InputGroupTextStyled bg={bg} {...rest}>
      {children}
    </InputGroupTextStyled>
  );
};

export const InputGroupBlock: FC<InputGroupElementProps> & WithStyle = ({ children, bg, ...rest }) => {
  return (
    <InputGroupBlockStyled bg={bg} {...rest}>
      {children}
    </InputGroupBlockStyled>
  );
};

InputGroup.displayName = 'InputGroup';
InputGroup.Style = InputGroupStyled;

InputGroup.Addon = InputGroupAddon;
InputGroupAddon.displayName = 'InputGroup.Addon';
InputGroupAddon.Style = InputGroupAddonStyled;

InputGroup.Text = InputGroupText;
InputGroupText.displayName = 'InputGroup.Text';
InputGroupText.Style = InputGroupTextStyled;

InputGroup.Block = InputGroupBlock;
InputGroupBlock.displayName = 'InputGroup.Block';
InputGroupBlock.Style = InputGroupBlockStyled;
